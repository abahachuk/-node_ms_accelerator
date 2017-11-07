const bunyan = require('bunyan');
const Elasticsearch = require('bunyan-elasticsearch');
const { elasticsearchSettings: { url } } = require('../config');

const esStream = new Elasticsearch({
    indexPattern: '[logstash-]YYYY.MM.DD',
    type: 'logs',
    host: url,
});

esStream.on('error', function (err) {
    console.log('Elasticsearch Stream Error:', err.stack);
});

const streams = [{
    level: 'info',
    stream: esStream
}];

if (process.env.NODE_ENV !== 'production') {
    streams.push({
        level: 'info',
        stream: process.stdout,
    });
}
const logger = bunyan.createLogger({
    name: "Heavy_generator application logger",
    streams,
    serializers: bunyan.stdSerializers
});

module.exports = logger;
