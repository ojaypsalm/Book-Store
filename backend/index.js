const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bookRouter = require('./routes/book.route.js')
const app = express()
const userRouter = require('./routes/user.route.js')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


app.get('/', (req, res)=>{
    res.send("Welcome to my backend")
})

app.use('/api/books', bookRouter)
app.use('/auth/books/', userRouter)

// app.post('/login', async (req, res)=>{
//   try {
//     const {email, password} = req.body
//     UserMod.findOne({email: email})
//         .then(user=>{
//             if(user){
//                 if(user.password === password){
//                     res.json('successful')
//                 }else{
//                     res.json('password incorrect')
//                 }
//             }else{
//                 res.json('no record found')

//             }
//         })
    
//   }   catch (error) {
//     res.status(500).json({message: error.message})
    
//   }
// })




app.listen(3001, (req, res)=>{
    console.log("server running at PORT 3001")
})



mongoose.connect(`mongodb+srv://adekanmisamuel4:4Lsd2i4SrSYyGkfB@cluster0.pyry4wp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() =>{
    console.log('Connected!!!')
  })
  .catch(()=>{
    console.log("connection failed")
  })