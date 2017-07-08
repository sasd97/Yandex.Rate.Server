module.exports = {
	URI: 'mongodb://localhost:27017/hategram',
	//URI: '',
	OPTIONS: {
		server: {
			socketOptions: {
				keepAlive: 1
			}
		}
	}
};
