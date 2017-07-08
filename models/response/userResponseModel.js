'use strict';

module.exports = (user, token = null) => {
	const result = {
		id: user.id,
		nick: user.nick,
		name: user.name,
		isActive: user.isActive,
		creationDate: user.creationDate
	};

	if (token) result.token = token;

	return result;
};
