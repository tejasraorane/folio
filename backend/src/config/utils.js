module.exports = {
    parseBooleanString: (string, def) => {
        if (string === undefined || string == null || string === '') {
            return def
        }
        return (string.toLowerCase() === 'true')
    },

    normalizePort: (val) => {
        var port = parseInt(val, 10)
    
        if (isNaN(port)) {
            return val
        }
    
        if (port >= 0) {
            return port
        }
    
        return false
    }
}
