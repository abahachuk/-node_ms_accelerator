const rabbitMQSettings = {
	url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
};

module.exports = Object.assign({}, { rabbitMQSettings });
