'use strict';

module.exports = mongoose => {
	const Schema = mongoose.Schema;

	const userSchema = new Schema({
		nick: {
			type: String,
			unique: true,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		roles: {
			type: [String],
			required: true
		},
		wallet: {
			type: Number,
			default: 0
		},
		isActive: {
			type: Boolean,
			default: true
		},
		activationToken: {
			type: String
		},
		creationDate: {
			type: Date,
			default: Date.now
		}
	});

	return mongoose.model('Users', userSchema);
};
