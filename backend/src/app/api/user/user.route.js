const express = require('express'),
    router = express.Router(),
    { createUser, listUsers, updateUser, deleteUser } = require('./user.controller')

router.post('/create', createUser)

router.get('/list', listUsers)

router.put('/update', updateUser)

router.delete('/delete', deleteUser)

module.exports = router
