'use strict';

const AppUnit = require('../app/unit');

class UserManager extends AppUnit {
	constructor(userModel) {
		super({ userModel });
	}

	_onBind() {
		this.save = this.save.bind(this);
		this.parseUsers = this.parseUsers.bind(this);
		this.findByIdAndNick = this.findByIdAndNick.bind(this);
	}

	parseUsers(users) {

	}

	save(nick, name, role) {
		const user = new this.userModel({ nick, name, role });
		return user.save();
	}

	findByIdAndNick(userId, nick) {
		return this.userModel.findOne({ userId, nick });
	}
}

module.exports = UserManager;
