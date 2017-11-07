const connect = require('./queue');
const logger = require('./utils/logger');

connect();

logger.info('---- Starting Heavy_generator service ----');
