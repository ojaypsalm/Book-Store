const express =  require('express')
const router = express.Router()

const { Login, Signup, verifyJWT } = require('../controller/user.controller.route.js')

router.post('/register', Signup)
router.post('/login', Login)

//protected routes
router.get('/protected', verifyJWT, (req, res)=>{
    res.json({ message: 'You are authorized', user: req.user})
})

module.exports = router;