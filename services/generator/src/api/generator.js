const status = require('http-status');
const { calculateNumber } = require('../services/generator');

module.exports = (app) => {
    app.get('/', async (req, res) => {
        const number = await calculateNumber();

        res.status(status.OK).send(`Hello Generator Service: ${number}`);
    });
};
