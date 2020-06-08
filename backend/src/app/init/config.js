const appRoot = require('app-root-path')
process.env['NODE_CONFIG_DIR'] = `${appRoot}/src/config`

module.exports = require('config')
