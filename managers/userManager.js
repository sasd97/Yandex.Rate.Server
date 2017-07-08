'use strict';

const AppUnit = require('../app/unit');

class UserManager extends AppUnit {
	constructor(userModel) {
		super({ userModel });
	}

	_onBind() {
		this.save = this.save.bind(this);
		this.getAll = this.getAll.bind(this);
		this.parseUsers = this.parseUsers.bind(this);
		this.findByIdAndNick = this.findByIdAndNick.bind(this);
	}

	parseUsers(usersConfig) {
		return this.userModel
			.find({})
			.exec()
			.then(users => {
				if (!users || users.length === 0) {
					const creationPromises = usersConfig
						.map(user => {
							if (!user.telegram) return;
							return this.save(user.telegram, user.name, user.roles)
						});
					return Promise.all(creationPromises);
				}
				return users;
			});
	}

	save(nick, name, roles) {
		const user = new this.userModel({ nick, name, roles });
		return user.save();
	}

	getAll() {
		return this.userModel.find({});
	}

	findByIdAndNick(nick) {
		return this.userModel.findOne({ nick }).exec();
	}

	findByCredentials(nick) {
		return this.userModel.findOne({ nick }).exec();
	}
}

module.exports = UserManager;
