'use strict';

const BaseController = require('./baseController');

const Joi = require('joi');

const questionResponseProjector = require('../models/response/questionResponseModel');

const errorConfig = require('../config/errors');

class QuestionsController extends BaseController {
	constructor(usersManager, questionsManager) {
		super({ usersManager, questionsManager });
	}

	_onBind() {
		super._onBind();
		this.getQuestions = this.getQuestions.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
	}

	getQuestions(req, res, next) {
		const schema = Joi.object().keys({
			nick: Joi.string().required(),
			token: Joi.string().required()
		});

		const validationResult = this.validate(req, schema);
		if (validationResult.error) return next(errorConfig.BAD_REQUEST);

		const { nick } = req.query;

		return this
			.usersManager
			.findByNick(nick)
			.then(user => {
				if (!user) throw errorConfig.USER_NOT_FOUND;
				return this.questionsManager.getQuestions(user.id);
			})
			.then(questions => {
				return questions.map(question => {
					return {
						id: question.id,
						description: question.description,
						likes: question.likes,
						dislikes: question.dislikes
					};
				});
			})
			.then(questions => this.success(res, questions))
			.catch(error => this.error(res, error));
	}

	addQuestion(req, res, next) {
		const schema = Joi.object().keys({
			nick: Joi.string().required(),
			token: Joi.string().required(),
			description: Joi.string().required()
		});

		const validationResult = this.validate(req, schema);
		if (validationResult.error) return next(errorConfig.BAD_REQUEST);

		const { nick, description } = req.query;

		return this
			.usersManager
			.findByNick(nick)
			.then(user => {
				if (!user) throw errorConfig.USER_NOT_FOUND;
				return this.questionsManager.create(user.id, description);
			})
			.then(question => {
				return {
					id: question.id,
					description: question.description,
					likes: question.likes,
					dislikes: question.dislikes
				};
			})
			.then(questions => this.success(res, questions))
			.catch(error => this.error(res, error));
	}
}

module.exports = QuestionsController;
