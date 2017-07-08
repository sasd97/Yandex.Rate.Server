module.exports = {
	INTERNAL_SERVER_ERROR: {
		message: 'Internal server error',
		customError: true,
		toLog: true,
		statusCode: 500,
		code: 1
	},
	EMAIL_IN_USE: {
		message: 'Provide another user email',
		customError: true,
		statusCode: 500,
		code: 2
	},
	BAD_REQUEST: {
		message: 'Incorrect params sent to server',
		customError: true,
		statusCode: 500,
		code: 3
	},
	UNAUTHORIZED: {
		message: 'Bad accessToken or it was not sent',
		customError: true,
		statusCode: 500,
		code: 4
	},
	ALREADY_CONFIRMED: {
		message: 'The email is already confirmed',
		customError: true,
		statusCode: 500,
		code: 5
	},
	USER_NOT_FOUND: {
		message: 'User was not found or does not exist',
		customError: true,
		statusCode: 500,
		code: 6
	},
	EMAIL_NOT_CONFIRMED: {
		message: 'The email was not confirmed',
		customError: true,
		statusCode: 500,
		code: 7
	}
};
