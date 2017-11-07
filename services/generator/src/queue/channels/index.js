const { createChannel } = require('./heavyGenerator');

async function resolveChannels(conn) {
    return {
        'heavyGenerator': await createChannel(conn),
    }
}

module.exports = resolveChannels;
