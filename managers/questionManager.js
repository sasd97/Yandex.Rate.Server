'use strict';

const AppUnit = require('../app/unit');
const arrayUtils = require('../utils/arrayUtils');

class QuestionManager extends AppUnit {
	constructor(questionModel) {
		super({ questionModel });
	}

	_onBind() {
		this.create = this.create.bind(this);
	}

	create(userId, description) {
		const model = new this.questionModel({ userId, description });
		return model.save();
	}
}

module.exports = QuestionManager;
