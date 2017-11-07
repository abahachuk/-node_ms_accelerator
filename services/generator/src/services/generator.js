let connect = require('../queue');
let { generateUuid } = require('../utils/uuid');
let logger = require('../utils/logger');

const calculateNumber = (postfix = 0) => {
    return new Promise(async (resolve) => {
        const { heavyGenerator: channel } = await connect();

        const CHANNEL_NAME = 'heavy_generator';
        const corr = generateUuid();
        const num = parseInt(postfix);

        const queue = await channel.assertQueue('', { exclusive: true });

        function onMessage(msg) {
            if (msg.properties.correlationId === corr) {
                const number = msg.content.toString();

                resolve(number);

                logger.info('Got a new number: ', number);

                setTimeout(() => {
                    channel.connection.close();
                }, 500);
            }
        }

        await channel.consume(queue.queue, onMessage, { noAck: true });

        logger.info('Requesting for a new number');

        channel.publish(CHANNEL_NAME, '', Buffer.from(num.toString()), {
            correlationId: corr,
            replyTo: queue.queue
        });
    });
};

module.exports = Object.create({
    calculateNumber,
});


