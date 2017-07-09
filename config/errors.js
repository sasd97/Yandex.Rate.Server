module.exports = {
	INTERNAL_SERVER_ERROR: {
		message: 'Internal server error',
		customError: true,
		toLog: true,
		statusCode: 500,
		code: 1
	},
	QUESTION_NOT_FOUND: {
		message: 'Provide another question id. Question not found',
		customError: true,
		statusCode: 404,
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
		statusCode: 404,
		code: 6
	},
	USER_IS_LOCK: {
		message: 'User is lock',
		customError: true,
		statusCode: 401,
		code: 7
	},
	NOT_ENOUGH_BALANCE: {
		message: 'Your wallet is empty',
		customError: true,
		statusCode: 500,
		code: 8
	}
};
