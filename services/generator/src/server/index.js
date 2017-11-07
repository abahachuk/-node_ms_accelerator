const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const status = require('http-status');
const api = require('../api');

const start = function(options) {
	return new Promise((resolve, reject) => {
		let formData = multer();

		const app = express();

		// use morgan to log requests to the console
		app.use(morgan('dev'));

		// some security protection
		app.use(helmet());

		app.use(cookieParser());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
		app.use(formData.array());

		app.use((err, req, res, next) => { // eslint-disable-line
			reject(new Error('Something went wrong!, err:' + err));
			res.status(status.INTERNAL_SERVER_ERROR).send('Something went wrong!')
		});

		api(app, options);


		const server = app.listen(options.port, () => resolve(server));
	});
};

module.exports = Object.assign({}, { start });