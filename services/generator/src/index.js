const logger = require('./utils/logger');
const server = require('./server');
const config = require('./config');

logger.info('---- Starting Generator API Service ----');

process.on('uncaughtException', (err) => {
	logger.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err) => {
	logger.error('Unhandled Rejection', err);
});

const { port } = config.serverSettings;

server.start({
    port,
}).then(app => {
    logger.info(`Server started successfully, running on port: ${port}.`);

    app.on('close', () => {
        logger.info(`Server was stopped.`);
    })
});
