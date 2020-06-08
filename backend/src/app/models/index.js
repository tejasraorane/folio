const Sequelize = require('sequelize'),
    config = require('config')

const sequelize = new Sequelize(
    config.get('DATABASE.NAME'),
    config.get('DATABASE.USER'),
    config.get('DATABASE.PASSWORD'),
    {
        host: config.get('DATABASE.HOST'),
        port: config.get('DATABASE.PORT'),
        dialect: 'postgres',
        define: {
            freezeTableName: false,
            syncOnAssociation: false,
            timestamps: false
        },
    },
)

const models = {
    user: sequelize.import('./user.model')
}

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models)
    }
})

module.exports = models
module.exports.sequelize = sequelize
