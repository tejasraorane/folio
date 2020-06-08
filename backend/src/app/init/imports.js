const express = require('express'),
    userRoute = require('../api/user/user.route')

const router = express.Router()

exports.importRoutes = (app) => {
    // Init api route
    app.use('/api/v1', router)

    router.use('/user', userRoute)
}
