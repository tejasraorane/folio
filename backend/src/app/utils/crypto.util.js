const crypto = require('crypto')
const config = require('config')

const cryptoKey = config.get('CRYPTO_KEY')

module.exports = {

    encrypt(value) {
        const key = crypto.createCipher('aes-192-cbc', cryptoKey)
        let hex = key.update(value, 'utf8', 'hex')
        hex += key.final('hex')
        return hex
    },
    
    decrypt(value) {
        const key = crypto.createDecipher('aes-192-cbc', cryptoKey)
        let pass = key.update(value, 'hex', 'utf8')
        pass += key.final('utf8')
        return pass
    },
    
    validate(encryptedPass, password) {
        const decryptedPass = module.exports.decrypt(encryptedPass)
        return decryptedPass == password
    }
    
}

