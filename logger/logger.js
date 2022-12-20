const mlog = require("mocha-logger");

const logger = {
    info: mlog.log,
    error: mlog.error,
};
Object.freeze(logger);

module.exports = logger;