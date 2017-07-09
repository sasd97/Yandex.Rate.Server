'use strict';

const BaseController = require('./baseController');

const _ = require('underscore');
const Joi = require('joi');

const userResponseProjector = require('../models/response/userResponseModel');
const cryptoUtils = require('../utils/cryptoUtils');
const dateUtils = require('../utils/dateUtils');
const errorConfig = require('../config/errors');

class UsersController extends BaseController {
	constructor(usersManager, questionsManager) {
		super({ usersManager, questionsManager });
	}

	_onBind() {
		super._onBind();
		this.authorize = this.authorize.bind(this);
		this.getAll = this.getAll.bind(this);
		this.profile = this.profile.bind(this);
		this.lock = this.lock.bind(this);
		this.release = this.release.bind(this);
	}

	authorize(req, res, next) {
		const schema = Joi.object().keys({
			nick: Joi.string().required()
		});

		const validationResult = this.validate(req, schema);
		if (validationResult.error) return next(errorConfig.BAD_REQUEST);

		const { nick } = req.query;

		let user = {};
		const tokenData = { nick };

		this
			.usersManager
			.findByCredentials(nick)
			.then(u => {
				if (!u) return next(errorConfig.USER_NOT_FOUND);

				user.wallet = u.wallet;
				user.roles = u.roles;
				user.isActive = u.isActive;

				return this.questionsManager.count(u.id, u);
			})
			.then(u => {
				_.extend(user, u);

				tokenData.id = user.id;
				tokenData.name = user.name;
				return cryptoUtils.sign(tokenData);
			})
			.then(token => this.success(res, _.extend(user, { token })))
			.catch(error => next(errorConfig.INTERNAL_SERVER_ERROR));
	}

	getAll(req, res, next) {
		this
			.usersManager
			.getAll()
			.then(users => _.filter(users, user => user.nick !== req.user.nick))
			.then(users => {
				return users.map(user => {
					return this.questionsManager.count(user.id, user);
				});
			})
			.then(promises => {
				return Promise.all(promises);
			})
			.then(users => _.sortBy(users, user => user.name))
			.then(users => this.success(res, users))
			.catch(error => this.error(res, error));
	}

	profile(req, res, next) {
		this
			.questionsManager
			.count(req.user.id, req.user)
			.then(user => this.success(res, _.extend(user, { wallet: req.user.wallet })))
			.catch(error => this.error(res, error));
	}

	lock(req, res, next) {
		const schema = Joi.object().keys({
			nick: Joi.string().required(),
			token: Joi.string().required()
		});

		const validationResult = this.validate(req, schema);
		if (validationResult.error) return next(errorConfig.BAD_REQUEST);

		const { nick, token } = req.query;

		this.usersManager
			.findByNick(nick)
			.then(user => {
				if (!user.isActive) {
					if (!dateUtils.isLockExpires(user.lockDate)) throw errorConfig.USER_IS_LOCK;
				}
				return this.usersManager.changeActive(user.nick, token, false, Date.now());
			})
			.then(user => this.success(res, { success: true }))
			.catch(error => this.error(res, error));
	}

	release(req, res, next) {
		const schema = Joi.object().keys({
			nick: Joi.string().required(),
			token: Joi.string().required()
		});

		const validationResult = this.validate(req, schema);
		if (validationResult.error) return next(errorConfig.BAD_REQUEST);

		const { nick } = req.query;

		this
			.usersManager
			.changeActive(nick, null, true)
			.then(user => this.success(res, { success: true }))
			.catch(error => this.error(res, error));
	}
}

module.exports = UsersController;
