'use strict';

const loggerFactory = require('logger-utils');
const loggerConfig = require('../config/logger');

const { LOGGER_ENV = 'test' } = process.env;

const LOGGER_UNION = {
	defaultLogger: loggerFactory.createDefault(LOGGER_ENV),
	requestsLogger: loggerFactory.createRequests(LOGGER_ENV, loggerConfig.PATH),
	mixedLogger: loggerFactory.createError(LOGGER_ENV, loggerConfig.PATH)
};

const logMe = logger => {
	return data => {
		logger.warn(data);
		return data;
	};
}

module.exports = LOGGER_UNION;
module.exports.logMe = logMe;
