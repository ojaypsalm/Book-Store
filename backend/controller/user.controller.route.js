
const UserMod = require('../models/UserModel.js')
const bcrypt = require('bcryptjs');


const Signup = async(req, res)=>{
    try {
        if(!req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            !req.body.password
        ){
            return res.status(400).send({
                message: 'Send all required fields: firstname, lastname, email and password'
            })
        }
        const {firstName, lastName, email, password} = req.body
        const salt = await bcrypt.genSalt(30);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new UserMod({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        const userRegister = await user.save();
        res.status(200).json(userRegister)
        

    } catch (error) {
        if(error.code === 11000 && error.keyValue.email){
            res.status(409).json({message: 'Email already exist'})
        } 
        res.status(500).json({message: 'server error'})
    }
}


// const Login = async (req, res) =>{
//     try {
//         const {email, password} = req.body
//         UserMod.findOne({email: email})
//             .then(user=>{
//                 if(user){
//                     if(user.password === password){
//                         res.json('successful')
//                     }else{
//                         res.json('password incorrect')
//                     }
//                 }else{
//                     res.json('no record found')

//                 }
//             })
        
//     } catch (error) {
//         res.status(500).json({message: error.message})
        
//     }

// }

const Login= async (req, res)=>{
    try {
        const {email, password}= req.body

        const user = await UserMod.findOne({email: email})
        if(!user){
            return res.status(401).json({message: 'Invalid email or password!!'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({message: 'Invalid email or password!!'})
        }
        res.json({message: 'successful Login'})
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        
    }
}




// const Signup = async (req, res) =>{
//      try {

//         if (
//             !req.body.firstName ||
//             !req.body.lastName ||
//             !req.body.email ||
//             !req.body.password
//       ){

//             return res.status(400).send({
//                   message: "Send all required fields: firstName,lastName, email,password"
//             })
//         }
//         const userReg = await UserMod.create(req.body)
//            res.status(200).json(userReg)
        

//     }catch (error) {
            
//     console.log(error)
//     res.status(500).json({message: error.message})
//     }

// }

module.exports = {
    Signup,
    Login,
}