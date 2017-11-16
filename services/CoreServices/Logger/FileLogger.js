/**
 * Logger file
 */
"use strict";

var fs = require('mkdirp');
var winston = require('winston');

var config = require('config');
var maxLogFileSize = config.maxLogFileSize;
var logDirectory = config.logDir;
var loggingLevel = config.logLevel;
var consoleLogging = config["console-log"];
var logger = null;

if (!consoleLogging) {
    fs.sync(logDirectory);
    logger = new winston.Logger({
        transports:
                [new (require('winston-daily-rotate-file'))({
                        name: 'normal',
                        datePattern: 'yyyy-MM-dd',
                        prepend: true,
                        maxsize:maxLogFileSize,
                        filename: logDirectory + '/.log',
                        colorize: true}),
                    new (require('winston-daily-rotate-file'))({
                        name: 'error',
                        datePattern: 'yyyy-MM-dd-',
                        prepend: true,
                        maxsize:maxLogFileSize,
                        filename: logDirectory + '/error.log',
                        level: 'error',
                        colorize: true})
                ]
    });
} else {
    logger = new winston.Logger().add(winston.transports.Console, {colorize: true});
}
logger.info("max log file Size", maxLogFileSize);

logger.level = loggingLevel;
module.exports = logger;
