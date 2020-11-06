## Usage

```js
const log = require("xxd-log");

// Different log levels
// Accept same arguments as `console.log()`
const count = 5;
log.trace("count: %d", count);
log.debug("count:", count);
log.info(`count: ${count}`);
log.warn({ count });
log.error(new Error(`count (${count}) is wrong.`));
log.fatal("Duang!");

// Use chalk directly
console.log(log.chalk.red("This is red."));
```

## Configure

```js
// Change options of the default logger instance.

log.withLabel = false; // Do not display labels before messages.
log.withTimestamp = false; // Do not display current time before messages.
log.highlightStackTrace = false; // Do not highlight key positions in error stack trace.
log.timestampFormat = "HH:mm:ss.SSS"; // Customize the time format.

log.withLabel = log.defaultOptions.withLabel; // reset an option to default value.
```

```js
// Use an individual instance with different options

const anotherLogger = log.newLogger({
  withLabel: false,
  withTimestamp: false,
  highlightStackTrace: false,
});
```

You can change these options at any time in the process, and will take effect from next call of logging.

For further instruction of time format, please see [moment.js documentation](http://momentjs.com/docs/#/displaying/format/)

### Options List

| Option              | Type    | Description                                                                                                                              |
| ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| withTimestamp       | boolean | Control if print message with timestamp before, default to `true`                                                                        |
| withLabel           | boolean | Control if print message with label (indicating log level) before, default to `true`                                                     |
| timestampFormat     | string  | Define how timestamp looks like, see `moment.format()` (http://momentjs.com/docs/#/displaying/format/), default to 'YYYY-MM-SS HH:mm:ss' |
| highlightStackTrace | string  | Control if highlight files in project (in `process.cwd()`, and not in `node_modules`) in error stack trace. default to `true`            |

## Requirements

### v2.x

- **Node.js** > `12.4.0`

### v1.x

- **Node.js** > `6.0.0`
- or **Node.js** > `4.0.0` with `--harmony`
