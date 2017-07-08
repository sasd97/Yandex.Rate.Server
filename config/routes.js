'use strict';

module.exports = {
	users: {
		authorize: '/auth',
		getAll: '/users/all',
		profile: '/profile',
		lock: '/lock',
		release: '/release'
	},
	questions: {
		getQuestions: '/questions',
		addQuestion: '/questions/add',
		getQuestion: '/questions/get'
	}
};
