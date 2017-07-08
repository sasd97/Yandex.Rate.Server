'use strict';

const BaseController = require('./baseController');

const Joi = require('joi');

const questionResponseProjector = require('../models/response/questionResponseModel');

const errorConfig = require('../config/errors');

class QuestionsController extends BaseController {
	constructor(questionsManager) {
		super({ questionsManager });
	}

	_onBind() {
		super._onBind();
	}
}

module.exports = QuestionsController;
