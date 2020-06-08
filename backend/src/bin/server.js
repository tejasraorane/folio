require('dotenv').config()
require('../app/init/config')

/* Config package to import configuration based on node environment */
const config = require('config'),

    /* Initiate the logger */
    logger  = require('../app/init/logger'),

    /* Import the ExpressJS framework for Middleware/routing */
    express = require('express'),

    /* Import Body Parser module for enabling data from POST requests
        to be extracted and parsed */
    bodyParser = require('body-parser'),

    /* Handle for storing the ExpressJS object */
    app = express(),
    
    /* Global error handler */
    { errorInterceptor, requestValidator } = require('../app/middlewares/error.interceptor'),

    loggingInterceptor = require('../app/middlewares/logging.interceptor'),

    models = require('../app/models')
  
/* Contains method to import routes and validate request content-type */
imports = require('../app/init/imports')

/*
  Manage size limits for POST/PUT requests
 */
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(requestValidator)
/*
   Manage CORS Access for ALL requests/reponses
 */
app.use((request, response, next) => {
    /* Allow access from any requesting client */
    response.setHeader('Access-Control-Allow-Origin', '*')
  
    /* Set required control methods */
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
  
    /* Set the Http request header */
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
    next()
})

/**
 * Initiate logger for requests and response
 */
loggingInterceptor(app)
  
/**
 * Import all routes
 */
imports.importRoutes(app)
  
/**
 * Added to intercept handled/unhandled errors
 */
app.use(errorInterceptor)

/**
 * Start the application
 */
const eraseDatabaseOnSync = false
models.sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    logger.info('Connected to the database')
    app.listen(config.get('PORT'), function () {
        logger.info(`Server is listening on port ${config.get('PORT')}`)
    })
}).catch(error => {
    logger.error('Failed to connect the database', error)
})
  
module.exports = app
