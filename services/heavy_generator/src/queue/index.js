const amqp = require('amqplib');
const { rabbitMQSettings: { url } } = require('../config');
const resolveChannels = require('./channels');
const logger = require('../utils/logger');

const RECONNECT_TIMEOUT = 1000;

async function connect() {
    let conn;

    try {
        conn = await amqp.connect(url);
    } catch (e) {
        logger.error(e);

        setTimeout(connect, RECONNECT_TIMEOUT);
    }

    process.once('SIGINT', conn.close.bind(conn));

    return await resolveChannels(conn);
}

module.exports = () => connect();
