/**
 * Custom error class.
 *
 * Error class is overriden for creating custom errors as per requirement.
 */

/**
 * Generic Error
 */
class AppError extends Error {
    constructor (message, status) {
        super()
        Error.captureStackTrace(this, this.constructor)
        this.name = this.constructor.name
        this.message = message || 'Something went wrong. Please try again.'
        this.status = status || 500
    }
}

/**
 * If record set is not found.
 * returns message with custom status 404.
 */
class NotFoundError extends AppError {
    constructor (message) {
        super(message || 'No record found for given input', 404)
    }
}

/**
 * If request is inappropriate.
 * returns message with custom status 400.
 */
class BadRequestError extends AppError {
    constructor (message) {
        super(message || 'Request is not valid', 400)
    }
}

/**
 * If content type is invalid.
 * returns message with custom status 415.
 */
class InvalidContentError extends AppError {
    constructor (message) {
        super(message || 'Invalid content. Appropriate content type is \'application/json\'', 415)
    }
}

/**
 * If admin authentication fails.
 * returns message with custom status 401.
 */
class AuthenticationError extends AppError {
    constructor () {
        super('Authentication failed', 401)
    }
}

module.exports =  {
    NotFoundError,
    BadRequestError,
    InvalidContentError,
    AuthenticationError
}
