const amqp = require('amqplib');
const generator = require('../utils/generator');
const { rabbitMQSettings: { url } } = require('../config');


async function connect() {
    let conn;

    try {
        conn = await amqp.connect(url);
    } catch (e) {
        console.error(e);
    }

    process.once('SIGINT', conn.close.bind(conn));

    return conn;
}

async function createChannel(conn) {
    const CHANNEL_NAME = 'heavy_generator';
    const CHANNEL_TYPE = 'fanout';

    const channel = await conn.createChannel();

    async function callback(msg) {
        const number = await generator();

        console.log(" [x] %s:'%s'",
            msg.fields.routingKey,
            msg.content.toString());

        channel.ack(number);
    }

    await channel.assertExchange(CHANNEL_NAME, CHANNEL_TYPE, { durable: false });

    const queue = await channel.assertQueue('', { exclusive: true });

    await channel.bindQueue(queue, CHANNEL_NAME, '');
    await channel.consume(queue, callback, { noAck: false });

    console.log(' [*] Waiting for messages. To exit press CTRL+C.');
}


/*function createChannel(conn) {
    return conn.createChannel().then(function (channel) {
        const name = 'heavy_generator';
        const type = 'fanout';

        function callback(msg) {
            generator()
                .then((number) => {
                    console.log(" [x] %s:'%s'",
                        msg.fields.routingKey,
                        msg.content.toString());

                    channel.ack(number);
                });
        }

        const exchange = channel.assertExchange(name, type, { durable: false });

        exchange
            .then(() => channel.assertQueue('', { exclusive: true }))
            .then(({ queue }) => channel.bindQueue(queue, name, ''))
            .then(({ queue }) => channel.consume(queue, callback, { noAck: false }))
            .then(() => {
                console.log(' [*] Waiting for messages. To exit press CTRL+C.');
            });
    })
}*/


module.exports = () => {
    const conn = connect();

    return createChannel(conn);
};
