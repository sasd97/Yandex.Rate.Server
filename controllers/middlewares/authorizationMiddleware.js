'use strict';

const BaseController = require('../baseController');
const cryptoUtils = require('../../utils/cryptoUtils');
const errorConfig = require('../../config/errors');

const loggerUtils = require('../../utils/loggerUtils');

class AuthorizationMiddleware extends BaseController {
	constructor(userManager) {
		super({ userManager });
	}

	_onBind() {
		super._onBind();
		this.checkCredentials = this.checkCredentials.bind(this);
	}

	checkCredentials(req, res, next) {
		const token = req.query.token || req.body.token || req.params.token;
		if (!token) return next(errorConfig.UNAUTHORIZED);

		let currentPayload;

		cryptoUtils
			.verify(token)
			.then(payload => {
				currentPayload = payload;
				return this.userManager.findByNick(currentPayload.nick);
			})
			.then(user => {
				if (!user) return next(errorConfig.UNAUTHORIZED);

				req.user = user;
				next();
			})
			.catch(() => next(errorConfig.UNAUTHORIZED));
	}
}

module.exports = AuthorizationMiddleware;
