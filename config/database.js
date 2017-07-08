module.exports = {
	URI: 'mongodb://localhost:27017/hategram',
	//URI: 'mongodb://admin:hategram@ds151662.mlab.com:51662/hategram',
	OPTIONS: {
		server: {
			socketOptions: {
				keepAlive: 1
			}
		}
	}
};
