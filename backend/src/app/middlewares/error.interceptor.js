/**
 * Global error handler.
 * It intercepts the response for any error and customizes and forwards it.
 */
const { InvalidContentError } = require('../errors/app.error')

function errorInterceptor(error, request, response, next) {
    let status = error.status || 500
    let message = {
        error: error.name,
        message: error.message
    }

    if (error.name === 'UnauthorizedError') {
        status = 401
        message = {
            error: error.name,
            message: 'Not Authorized to access the api'
        }
    }

    response.status(status).send(message)
    return next()
}

/**
 * Validates request content type is application/json.
 * Throws Invalid content error if content type do not match.
 */
function requestValidator(request, response, next) {
    if (['POST', 'PUT'].includes(request.method) && !request.is('application/json')) {
        return next(new InvalidContentError())
    }
    next()
}

module.exports = {
    errorInterceptor,
    requestValidator
}
