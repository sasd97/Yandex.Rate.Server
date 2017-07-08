'use strict';

const AppUnit = require('../app/unit');
const arrayUtils = require('../utils/arrayUtils');
const errorConfig = require('../config/errors');

class QuestionManager extends AppUnit {
	constructor(questionModel) {
		super({ questionModel });
	}

	_onBind() {
		this.create = this.create.bind(this);
		this.count = this.count.bind(this);
		this.getQuestions = this.getQuestions.bind(this);
	}

	create(userId, description) {
		const model = new this.questionModel({ userId, description });
		return model.save();
	}

	count(userId, user) {
		const questionsQuery = this.questionModel.find({ userId });

		return questionsQuery
			.exec()
			.then(questions => {
				if (!questions) throw errorConfig.BAD_REQUEST;

				const result = {
					name: user.name,
					nick: user.nick,
					questionsNumber: questions.length,
					likes: 0,
					dislikes: 0
				};

				questions.forEach(question => {
					result.likes += question.likes;
					result.dislikes += question.dislikes;
				});

				return result;
			});
	}

	getQuestions(userId) {
		return this.questionModel.find({ userId })
			.exec()
			.then(questions => questions || []);
	}
}

module.exports = QuestionManager;
