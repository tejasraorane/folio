const models = require('../models')

class UserService {

    static async addUser(user) {
        try {
            return await models.user.create(user)
        } catch(error) {
            throw error
        }
    }

    static async findUser(username) {
        try {
            return await models.user.findOne({
                where: {username: username}
            })
        } catch(error) {
            throw error
        }
    }

    static async findAll() {
        try {
            return await models.user.findAll()
        } catch(error) {
            throw error
        }
    }

    static async deleteUser(username) {
        try {
            return await models.user.destroy({
                where: {username: username}
            })
        } catch(error) {
            throw error
        }
    }

    static async updateUser(username, data) {
        try {
            return await models.user.update(data, {
                where: {username: username}
            })
        } catch(error) {
            throw error
        }
    }

}

module.exports = UserService
