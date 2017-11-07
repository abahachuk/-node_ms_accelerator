const { createChannel } = require('./generator');

async function resolveChannels(conn) {
    return {
        'generator': await createChannel(conn),
    }
}

module.exports = resolveChannels;
