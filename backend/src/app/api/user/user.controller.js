const userService = require('../../services/user.service'),
    logger = require('../../init/logger'),
    { BadRequestError, NotFoundError } = require('../../errors/app.error'),
    { encrypt } = require('../../utils/crypto.util')

module.exports = {

    createUser(request, response, next) {
        const user = {
            username: request.body.username,
            password: encrypt(request.body.password),
            email: request.body.email,
            mobile: request.body.mobile,
        }

        userService.addUser(user).then(_user => {
            response.status(201).send({
                message: `${_user.username} is created successfully`
            })
            next()
        }).catch(_error => {
            logger.error(`Failed to create user ${request.body.username}`, _error)
            next(new BadRequestError(`Failed to create user ${request.body.username}`))
        })
    }, 

    listUsers(request, response, next) {
        userService.findAll().then(_users => {
            response.status(200).send(_users)
            next()
        }).catch(_error => {
            logger.error('Unable to fetch users', _error)
            next(new NotFoundError('Unable to fetch users'))
        })
    },

    updateUser(request, response, next) {
        const data = {
            password: encrypt(request.body.password),
            email: request.body.email,
            mobile: request.body.mobile,
        }
        userService.updateUser(request.body.username, data).then(_user => {
            response.status(201).send({
                message: `${_user.username} is updates successfully`
            })
            next()
        }).catch(_error => {
            logger.error(`Failed to update user ${request.body.username}`, _error)
            next(new BadRequestError(`Failed to update user ${request.body.username}`))
        })

    },

    deleteUser(request, response, next) {
        const username = request.body.username

        userService.deleteUser(username).then(() => {
            response.status(200).send({
                message: `${username} is deleted successfully`
            })
            next()
        }).catch(_error => {
            logger.error(`Failed to delete user ${username}`, _error)
            next(new BadRequestError(`Failed to delete user ${username}`))
        })
    }

}
