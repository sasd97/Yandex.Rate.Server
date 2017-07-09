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
		this.findByNick = this.findByNick.bind(this);
		this.changeActive = this.changeActive.bind(this);
		this.decreaseWallet = this.decreaseWallet.bind(this);
	}

	updateWallet(id) {
		return this.userModel.findOneAndUpdate({ _id: id }, { $inc: { wallet: 2 } }, { 'new': true }).exec();
	}

	decreaseWallet(id) {
		return this.userModel.findOneAndUpdate({ _id: id }, { $inc: { wallet: -1 } }, { 'new': true }).exec();
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

	findByNick(nick) {
		return this.userModel.findOne({ nick }).exec();
	}

	findByCredentials(nick) {
		return this.userModel.findOne({ nick }).exec();
	}

	changeActive(nick, activationToken, isActive, lockDate = null) {
		return this.userModel.findOneAndUpdate({ nick }, { activationToken, isActive, lockDate }, { 'new': true }).exec();
	}
}

module.exports = UserManager;
