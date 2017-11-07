async function createChannel(conn) {
    const CHANNEL_NAME = 'heavy_generator';
    const CHANNEL_TYPE = 'fanout';

    const channel = await conn.createChannel();

    await channel.assertExchange(CHANNEL_NAME, CHANNEL_TYPE, { durable: false });

    return channel;
}

module.exports = {
    createChannel,
};
