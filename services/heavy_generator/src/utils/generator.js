const logger = require('./logger');

module.exports = (postfix) => {
    return new Promise((resolve) => {
        const number = ~~(Math.random() * 1000000 % 1000);

        logger.info(`Generated number: ${number}`);

        setTimeout(() => {
            resolve(number + postfix);
        }, number);
    });
}
