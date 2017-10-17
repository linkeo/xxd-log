'use strict';

/* eslint no-console: 0 */

const chalk = require('chalk');
const moment = require('moment');
const util = require('util');


class Logger {

  /**
   * Make new Logger with options.
   * @param {object} options Options of logger printing
   * @param {boolean} options.withTimestamp Control if print message with timestamp before, default to `true`
   * @param {boolean} options.withLabel Control if print message with label (indicating log level) before, default to `true`
   * @param {string} options.timestampFormat Define how timestamp looks like, see `moment.format()` (http://momentjs.com/docs/#/displaying/format/), default to 'YYYY-MM-SS HH:mm:ss'
   * @param {string} options.highlightStackTrace Control if highlight files in project (in `process.cwd()`, and not in `node_modules`) in error stack trace. default to `true`
   */
  constructor(options) {
    Object.defineProperty(this, 'options', { value: Object.assign({}, options) });
    this.options.withTimestamp = this.options.withTimestamp !== undefined ? this.options.withTimestamp : true;
    this.options.withLabel = this.options.withLabel !== undefined ? this.options.withLabel : true;
    this.options.highlightStackTrace = this.options.highlightStackTrace !== undefined ? this.options.highlightStackTrace : true;
    this.options.timestampFormat = this.options.timestampFormat !== undefined ? this.options.timestampFormat : 'YYYY-MM-DD HH:mm:ss.SSS';
    this.chalk = chalk;
    this.Logger = Logger;
    this.log = this.log.bind(this);
    this.echo = this.echo.bind(this);
    this.println = this.println.bind(this);
    this.trace = this.trace.bind(this);
    this.debug = this.debug.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
    this.fatal = this.fatal.bind(this);
  }

  /**
   * Control if print message with timestamp before, default as `true`
   * @type {boolean}
   */
  get withTimestamp() { return this.options.withTimestamp; }
  set withTimestamp(value) { this.options.withTimestamp = value; }

  /**
   * Control if print message with label (indicating log level) before, default as `true`
   * @type {boolean}
   */
  get withLabel() { return this.options.withLabel; }
  set withLabel(value) { this.options.withLabel = value; }

  /**
   * Define how timestamp looks like, see `moment.format()` (http://momentjs.com/docs/#/displaying/format/), default as 'YYYY-MM-SS HH:mm:ss'
   * @type {string}
   */
  get timestampFormat() { return this.options.timestampFormat; }
  set timestampFormat(value) { this.options.timestampFormat = value; }

  /**
   * Print plain message to `console.log`
   */
  log(message = undefined, ...optionalParams) {
    console.log(makeMessage.call(this, '', chalk.white, message, ...optionalParams));
  }
  /**
   * Print plain message to `console.log`
   */
  echo(message = undefined, ...optionalParams) {
    return this.log(message, ...optionalParams);
  }
  /**
   * Print plain message to `console.log`
   */
  println(message = undefined, ...optionalParams) {
    return this.log(message, ...optionalParams);
  }
  /**
   * Print trace message to `console.log`
   */
  trace(message = undefined, ...optionalParams) {
    console.log(makeMessage.call(this, 'TRACE', chalk.green, message, ...optionalParams));
  }
  /**
   * Print debug message to `console.log`
   */
  debug(message = undefined, ...optionalParams) {
    console.log(makeMessage.call(this, 'DEBUG', chalk.cyan, message, ...optionalParams));
  }
  /**
   * Print highlighted message to `console.log`
   */
  info(message = undefined, ...optionalParams) {
    console.log(makeMessage.call(this, 'INFO', chalk.blue, message, ...optionalParams));
  }
  /**
   * Print warning message to `console.log`
   */
  warn(message = undefined, ...optionalParams) {
    console.log(makeMessage.call(this, 'WARN', chalk.yellow, message, ...optionalParams));
  }
  /**
   * Print error message to `console.error`
   */
  error(message = undefined, ...optionalParams) {
    console.error(makeMessage.call(this, 'ERROR', chalk.red, message, ...optionalParams));
  }
  /**
   * Print fatal error message to `console.error`
   */
  fatal(message = undefined, ...optionalParams) {
    console.error(makeMessage.call(this, 'FATAL', chalk.magenta, message, ...optionalParams));
  }
  newLogger(options) { return new Logger(options); }
}

/**
 * @type {Logger}
 */
module.exports = new Logger();

function makeMessage(label, colorizer, ...args) {
  let messages = [];
  if (this.options.withTimestamp) {
    messages.push(moment().format(this.options.timestampFormat));
  }
  if (this.options.withLabel && label) {
    messages.push(chalk.bold(colorizer(`[${label}]`)));
  }
  let msg = util.format(...args);
  if (this.options.highlightStackTrace) {
    msg = decorateErrorStack(msg);
  }
  messages.push(colorizer(msg));
  return messages.join(' ');
}

function decorateErrorStack(stack) {
  const cwd = process.cwd();
  if (!/\n\s*at\s+/.test(stack)) { // A simple test for stack trace style.
    return stack;
  }
  return stack.split('\n').map(line => {
    if (/^\s*at\s+/.test(line) && /:\d+:\d+/.test(line) && line.includes(cwd) && !line.includes('node_modules')) {
      return chalk.bold(line);
    }
    return line;
  }).join('\n');
}
