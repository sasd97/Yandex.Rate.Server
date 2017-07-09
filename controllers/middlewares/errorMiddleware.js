'use strict';

const BaseController = require('../baseController');
const { mixedLogger } = require('../../utils/loggerUtils');

class ErrorMiddleware extends BaseController {
	_onBind() {
		super._onBind();

		this.obtainError = this.obtainError.bind(this);
		this.handleError = this.handleError.bind(this);
	}

	obtainError(error, req, res, next) {
		if (!error.customError) {
			mixedLogger.error(error);
			res.status(500);
			return next({ code: 1, message: 'Internal server error' });
		}
		if (error.toLog) mixedLogger.error(error);
		res.status(error.statusCode);

		return next({
			code: error.code,
			message: error.message
		});
	}

	handleError(error, req, res, next) {
		this.error(res, error);
	}
}

module.exports = ErrorMiddleware;
