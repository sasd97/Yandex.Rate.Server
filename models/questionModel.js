'use strict';

module.exports = mongoose => {
	const Schema = mongoose.Schema;

	const questionSchema = new Schema({
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'Users'
		},
		description: {
			type: String,
			required: true
		},
		likes: {
			type: Number,
			default: 0
		},
		likers: {
			type: [String],
			default: []
		},
		dislikes: {
			type: Number,
			default: 0
		},
		dislikers: {
			type: [String],
			default: []
		},
		creationDate: {
			type: Date,
			default: Date.now
		}
	});

	return mongoose.model('Questions', questionSchema);
};
