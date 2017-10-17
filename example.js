'use strict';
// const log = require('xxd-log');
const log = require('./index');

// Different log levels
// Accept same arguments as `console.log()`
const count = 5;
log.trace('count: %d', count);
log.debug('count:', count);
log.info(`count: ${count}`);
log.warn({ count });
log.error(new Error(`count (${count}) is wrong.`));
log.fatal('Duang!');

// Use chalk directly
console.log(log.chalk.red('This is red.'));
