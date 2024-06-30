const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bookRouter = require('./routes/book.route.js')
const app = express()
const userRouter = require('./routes/user.route.js')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
require('dotenv').config();
const UserMod = require('./models/UserModel.js')


app.get('/', (req, res)=>{
  res.send("Welcome to my backend")
})

app.use(process.env.APP_BOOK_ROUTE, bookRouter)
app.use(process.env.APP_USER_ROUTE, userRouter)


app.listen(3001, (req, res)=>{
    console.log("server running at PORT 3001")
})



mongoose.connect(process.env.MONGODB_URL)
  .then(() =>{
    console.log('Connected!!!')
  })
  .catch(()=>{
    console.log("connection failed")
  })