'use strict';

module.exports = {
	isLockExpires(date) {
		const currentDate = Date.now();
		const expiresDate = Date.parse(date);

		return (currentDate - expiresDate) / 1000 > 30;
	}
};