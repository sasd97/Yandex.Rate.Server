'use strict';

module.exports = question => {
	return {
		id: question.id,
		description: question.description,
		likes: question.likes,
		dislikes: question.dislikes
	};
};