'use strict';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const tokenConfig = require('../config/token');

module.exports = {
	encrypt(data) {
		const cipher = crypto.createCipher(tokenConfig.algorithm, tokenConfig.privateKey);
		let crypted = cipher.update(data.toString(), 'utf8', 'hex');
		crypted += cipher.final('hex');
		return crypted;
	},

	sign(data) {
		return new Promise((resolve, reject) => {
			jwt.sign(data, tokenConfig.privateKey, (error, token) => {
				if (error) return reject(error);
				resolve(token);
			});
		});
	},

	verify(data) {
		return new Promise((resolve, reject) => {
			jwt.verify(data, tokenConfig.privateKey, (error, payload) => {
				if (error) return reject(error);
				resolve(payload);
			});
		});
	}
};
