const express =  require('express')
const router = express.Router()

const { Login, Signup } = require('../controller/user.controller.route.js')

router.post('/register', Signup)
router.post('/login', Login)

module.exports = router;