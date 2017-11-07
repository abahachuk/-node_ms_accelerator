const logger = require('./utils/logger');
const server = require('./server');
const config = require('./config');

logger.info('--- Generator Service ---');

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

/*
const express = require('express');

// Constants
const PORT = 3001;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.listen(PORT, HOST);

logger.info(`Running on http://${HOST}:${PORT}`);*/

