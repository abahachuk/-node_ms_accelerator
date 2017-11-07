const generatorApi = require('./generator');
// const status = require('http-status');

module.exports = (app, options) => {
	/*app.all('*', checkUser);

	function checkUser(req, res, next) {
		if (true /!*req.authUser*!/) {
			return next(req, res);
		}

		res.status(status.UNAUTHORIZED).send();
	}*/

	return generatorApi(app, options);
};
