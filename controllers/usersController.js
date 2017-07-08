'use strict';

const BaseController = require('./baseController');

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
	}

	authorize(req, res, next) {
		const schema = Joi.object().keys({
			nick: Joi.string().required()
		});

		const validationResult = this.validate(req, schema);
		if (validationResult.error) return next(errorConfig.BAD_REQUEST);

		const { nick } = req.query;

		let user;
		const tokenData = { nick };

		this
			.usersManager
			.findByCredentials(nick)
			.then(u => {
				if (!u) return next(errorConfig.USER_NOT_FOUND);

				user = u;
				tokenData.id = user.id;
				tokenData.name = user.name;
				return cryptoUtils.sign(tokenData);
			})
			.then(token => this.success(res, userResponseProjector(user, token)))
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
}

module.exports = UsersController;
