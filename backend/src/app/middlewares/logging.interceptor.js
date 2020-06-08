const logger = require('../init/logger'),
    expressWinston = require('express-winston')
config = require('config')


module.exports = loggerInterceptor
/**
 * 
 * @param {*} app 
 * 
 * Initializes the request response logger for the application.
 * Logs every request and it's response.
 * The msg logs whole request url, request body(only for POST and PUT methods), response status and response time with response bytes. 
 */
function loggerInterceptor(app) {
    app.use(expressWinston.logger({
        transports: [logger],
        meta: false,
        msg: function (request, response) {
            let requestParams = {}
            if (['POST', 'PUT'].includes(request.method)) {
                requestParams = request.body
            }
            let host = request.hostname == 'localhost' ? `${request.hostname}:${config.get('PORT')}` : request.hostname
            let requestUrl = `${request.protocol}://${host}${request.originalUrl}`
            let requestMessage = `${request.ip} ${request.method} ${requestUrl}`
            Object.keys(requestParams).length == 0 ? null : requestMessage = requestMessage + ` ${JSON.stringify(requestParams)}`
            let responseMessage = `${response.statusCode} ${response.statusMessage} ${response.responseTime}ms`
            return `${requestMessage} -  ${responseMessage}`
        },
        expressFormat: false,
    }))
}
