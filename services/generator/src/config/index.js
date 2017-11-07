const serverSettings = {
    port: process.env.PORT || 3001,
};

const rabbitMQSettings = {
    url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
};

const elasticsearchSettings = {
    url: process.env.ELASTICSEARCH_URL || 'localhost:9200',
};

module.exports = Object.assign({}, {
    serverSettings,
    rabbitMQSettings,
    elasticsearchSettings,
});
