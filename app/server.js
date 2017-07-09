'use strict';

const express = require('express');

const AppUnit = require('./unit');
const AppRoutes = require('./routes');
const AppDatabase = require('./database');
const httpConfig = require('../config/http');

class AppServer extends AppUnit {
	_onBind() {
		this.start = this.start.bind(this);
	}

	_onCreate() {
		const app = express();
		app.listen(httpConfig.PORT, () => console.info(`App is started on ${httpConfig.PORT} port`));

		this._database = new AppDatabase();
		const managers = this._database.managers;

		this._routes = new AppRoutes(app, managers);
	}

	start() {
		this._routes.register();
	}
}

module.exports = new AppServer();
