/// @components : logger.js

/* @example
    const logger = require('./components/logger');
    logger.log('Bot started successfully!', 'info');
    logger.log('Something might be wrong...', 'warn');
    logger.log('An error occurred!', 'error');
*/

const colors = require('colors');

module.exports = {
    name: 'logger',
    description: 'Custom logger for bot activities',
    log: (message, type = 'info') => {
        const timestamp = new Date().toISOString();
        switch (type) {
            case 'info':
                console.log(`[${timestamp}] INFO: ${message}`.blue);
                break;
            case 'warn':
                console.log(`[${timestamp}] WARN: ${message}`.yellow);
                break;
            case 'error':
                console.log(`[${timestamp}] ERROR: ${message}`.red);
                break;
            default:
                console.log(`[${timestamp}] LOG: ${message}`);
        }
    }
};
