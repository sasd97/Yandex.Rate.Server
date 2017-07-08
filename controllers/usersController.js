'use strict';

const BaseController = require('./baseController');

const _ = require('underscore');
const Joi = require('joi');

const userResponseProjector = require('../models/response/userResponseModel');
const cryptoUtils = require('../utils/cryptoUtils');
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

				user.roles = u.roles;
				user.isActive = u.isActive;

				return this.questionsManager.count(user.id, u);
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
			.then(users => {
				return users.map(user => {
					if (user.nick === req.user.nick) return;
					return this.questionsManager.count(user.id, user);
				});
			})
			.then(promises => {
				return Promise.all(promises);
			})
			.then(users => {
				console.log(users);
				this.success(res, users)
			})
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
		const { token } = req.query;

		this
			.usersManager
			.changeActive(req.user.nick, token, false)
			.then(user => this.success(res, { success: true }))
			.catch(error => this.error(res, error));
	}

	release(req, res, next) {
		this
			.usersManager
			.changeActive(req.user.nick, null, true)
			.then(user => this.success(res, { success: true }))
			.catch(error => this.error(res, error));
	}
}

module.exports = UsersController;
