'use strict';

module.exports = (user, token = null) => {
	const result = {
		nick: user.nick,
		name: user.name,
		roles: user.roles,
		wallet: user.wallet,
		isActive: user.isActive
	};

	if (token) result.token = token;

	return result;
};
