'use strict';

const AppUnit = require('./unit');

const cors = require('cors');
const bodyParser = require('body-parser');

const AuthorizationMiddleware = require('../controllers/middlewares/authorizationMiddleware');
const ErrorMiddleware = require('../controllers/middlewares/errorMiddleware');

const UsersController = require('../controllers/usersController');
const QuestionController = require('../controllers/questionsController');

const routesConfig = require('../config/routes');

class AppRoutes extends AppUnit {
	constructor(app, managers) {
		super({ app, managers });
	}

	_onBind() {
		this.register = this.register.bind(this);
		this.registerHeaders = this.registerHeaders.bind(this);
		this.registerUsers = this.registerUsers.bind(this);
		this.registerQuestion = this.registerQuestion.bind(this);
		this.registerFooter = this.registerFooter.bind(this);
	}

	_onCreate() {
		this.authorizationMiddleware = new AuthorizationMiddleware(this.managers.users);
		this.errorMiddleware = new ErrorMiddleware();

		this.usersController = new UsersController(this.managers.users);
		this.questionsControllers = new QuestionController(this.managers.questions);
	}

	register() {
		this.registerHeaders(this.app);
		this.registerUsers(this.app, routesConfig.users, this.usersController);
		this.registerQuestion(this.app, routesConfig.questions, this.questionsControllers);
		this.registerFooter(this.app);
	}

	registerHeaders(app) {
		app.use(cors());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
	}

	registerFooter(app) {
		app.use(this.errorMiddleware.obtainError);
		app.use(this.errorMiddleware.handleError);
	}

	registerUsers(app, paths, controller) {
		app.get(paths.authorize, controller.authorize);
	}

	registerQuestion(app, paths, controller) {
	}
}

module.exports = AppRoutes;