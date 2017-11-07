const generator = require('../../utils/generator');
const logger = require('../../utils/logger');

async function createChannel(conn) {
    const CHANNEL_NAME = 'heavy_generator';
    const CHANNEL_TYPE = 'fanout';

    const channel = await conn.createChannel();

    async function callback(msg) {
        const postfix = parseInt(msg.content.toString()) || 0;
        const number = await generator(postfix);

        logger.info(`Got message: ${msg.content.toString()}`);

        channel.sendToQueue(msg.properties.replyTo,
            Buffer.from(number.toString()),
            { correlationId: msg.properties.correlationId });

        channel.ack(msg);
    }

    await channel.assertExchange(CHANNEL_NAME, CHANNEL_TYPE, { durable: false });

    const { queue } = await channel.assertQueue('', { exclusive: true });

    await channel.bindQueue(queue, CHANNEL_NAME, '');
    await channel.consume(queue, callback, { noAck: false });

    logger.info('Waiting for messages. To exit press CTRL+C.');
}

module.exports = {
    createChannel,
};
