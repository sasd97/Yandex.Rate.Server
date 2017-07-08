'use strict';

const BaseController = require('./baseController');

const Joi = require('joi');

const userResponseProjector = require('../models/response/userResponseModel');
const cryptoUtils = require('../utils/cryptoUtils');
const errorConfig = require('../config/errors');

class UsersController extends BaseController {
	constructor(usersManager) {
		super({ usersManager });
	}

	_onBind() {
		super._onBind();
	}

}

module.exports = UsersController;
