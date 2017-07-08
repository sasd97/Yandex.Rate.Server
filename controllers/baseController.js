'use strict';

const AppUnit = require('../app/unit');

const Joi = require('joi');

const httpConfig = require('../config/http');

class BaseController extends AppUnit {
	_onBind() {
		this.error = this.error.bind(this);
		this.publish = this.publish.bind(this);
		this.success = this.success.bind(this);
		this.unsuccess = this.unsuccess.bind(this);
		this.responseModel = this.responseModel.bind(this);
		this.redirectToMain = this.redirectToMain.bind(this);
	}

	redirectToMain(res) {
		res.redirect(httpConfig.BASE_URL);
	}

	error(res, error) {
		res.json(this.responseModel(false, null, error, true));
	}

	publish(res, status, obj) {
		res.status(status);
		res.json(obj);
	}

	success(res, obj) {
		res.status(200);
		res.json(this.responseModel(true, obj));
	}

	unsuccess(res, obj) {
		res.status(500);
		res.json(this.responseModel(false, obj));
	}

	responseModel(success, response, error, isError = false) {
		if (isError) return { success, error };
		return { success, response };
	}

	validate(req, schema) {
		const toValidate = Object.assign({}, req.query, req.body, req.params);
		return Joi.validate(toValidate, schema);
	}
}

module.exports = BaseController;
