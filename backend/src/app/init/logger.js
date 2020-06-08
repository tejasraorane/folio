/**
 * This module is used to initialize the winston logger for logging in the application.
 * 
 * I have implemented file and console logging 
 * and the same package can be used to directly 
 * post to monitoring tools by just adding required 
 * transports in case we deploy it to a containerized environment.
 * 
 * For file logging it logs into two files - app.log for application logs and exception.log for any exceptions
 * 
 * Also implemented daily rotation of file logs with a limit of 10 days.
 */
const config = require('config'),
    appRoot = require('app-root-path'),
    { createLogger, format, transports } = require('winston'),
    { combine, timestamp, splat, printf, metadata } = format

require('winston-daily-rotate-file').DailyRotateFile

/**
 * logger format for winston
 */
const loggerFormat = printf(log => {
    let message = `${log.timestamp} ${log.level}: ${log.message}`
    Object.keys(log.metadata).length == 0 ? null :
        log.metadata.hasOwnProperty('meta') && Object.keys(log.metadata.meta).length == 0 ?
            null : message = message + ` - meta:${JSON.stringify(log.metadata)}`
    return message
})

/**
 * transport array for winston logger
 */
let _transports = []
let _exceptionTransports = []

/**
 * Add transport for file and console logging
 */
config.get('LOGGER.CONSOLE.ACTIVE') ? _transports.push(new transports.Console()) : null

if (config.get('LOGGER.FILE.ACTIVE')) {

    /**
   * App Log File transport
   */
    _transports.push(new transports.DailyRotateFile({
        filename: `${appRoot}${config.get('LOGGER.FILE.APP')}`,
        maxFiles: '10d'
    }))

    /**
   * Exception Log File transport
   */
    _exceptionTransports.push(new transports.DailyRotateFile({
        filename: `${appRoot}${config.get('LOGGER.FILE.EXCEPTION')}`,
        maxFiles: '10d'
    }))
  
}

/**
 * Instantiate a new Winston Logger with the custom format defined above
 */
const logger = createLogger({
    format: combine(
        splat(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        metadata({ fillExcept: ['level', 'message', 'timestamp'] }),
        loggerFormat
    ),
    transports: _transports,
    exceptionHandlers: _exceptionTransports
})

module.exports = logger
