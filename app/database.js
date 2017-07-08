'use strict';

const AppUnit = require('./unit');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const databaseConfig = require('../config/database');

const userModelHelper = require('../models/userModel');
const questionModelHelper = require('../models/questionModel');

const UserManager = require('../managers/userManager');
const QuestionManager = require('../managers/questionManager');

const loggerUtils = require('../utils/loggerUtils');
const cryptoUtils = require('../utils/cryptoUtils');
const usersConfig = require('../config/users.json');
const mixedLogger = loggerUtils.mixedLogger;

class AppDatabase extends AppUnit {
	_onBind() {
		this._onDatabaseInvoke = this._onDatabaseInvoke.bind(this);
	}

	_onCreate() {
		mongoose.connect(
			databaseConfig.URI,
			databaseConfig.OPTIONS,
			this._onDatabaseInvoke
		);

		const db = mongoose.connection;

		this.userModel = userModelHelper(mongoose);
		this.questionModel = questionModelHelper(mongoose);

		this.userManager = new UserManager(this.userModel);
		this.questionManager = new QuestionManager(this.questionModel);
	}

	_onDatabaseInvoke(error) {
		if (error) return mixedLogger.error(error);
		mixedLogger.info(`Connected to mongo ${databaseConfig.URI}`);

		this.userManager
			.parseUsers(usersConfig.people)
			.then(users => mixedLogger.info('Users created'))
			.catch(error => mixedLogger.error(`Error while create users: ${error}`));
	}


	get managers() {
		return {
			users: this.userManager,
			questions: this.questionManager
		};
	}

	get models() {
		return {
			user: this.userModel,
			question: this.questionModel
		};
	}
}

module.exports = AppDatabase;
