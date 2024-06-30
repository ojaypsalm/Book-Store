const UserMod = require('../models/UserModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');



const Signup = async(req, res)=>{
    try {
        if(!req.body.firstName ||
           !req.body.lastName ||
           !req.body.email ||
           !req.body.password
        ){
            return res.status(400).send({
                message: 'Send all required fields: firstName, lastName, email and password'
            })
        }
        const {firstName, lastName, email, password} = req.body;

        // Check if the user already exists
        const existingUser = await UserMod.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        //Hash a password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const user = new UserMod({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        //save user to database
        const userRegister = await user.save();
        res.status(201).json(userRegister)
        

    } catch (error) {
        if(error.code === 11000 && error.keyValue.email){
            res.status(409).json({message: 'Email already exist'})
        } 
        res.status(500).json({message: 'server error'})
    }
}



// const Login= async (req, res)=>{
//     try {
//         console.log('Received login request:')
//         const {email, password}= req.body

//         //check if user exists
//         const user = await UserMod.findOne({email: email})
//         if(!user){
//             console.log('User not found');
//             return res.status(401).json({message: 'Invalid email or password!!'})
//         }

//         //compare password
//         const isMatch = await bcrypt.compare(password, user.password)
//         if(!isMatch){
//             console.log('Password not matched')
//             return res.status(401).json({message: 'Invalid email or password!!'})
//         }

//         //Generate token
//         const payload = {userId: user._id}
//         const token =jwt.sign(payload, process.env.APP_SECRET_KEY, {expiresIn: '1h'})
//         res.json({message: 'Login Successful ',
//             token: token
//         })
//     } catch (error) {
//         console.log('Error during login:', error)
//         res.status(500).json({message: 'Server error'})
        
//     }
// }
const Login = async (req, res) => {
    try {
        console.log('Received login request:', req.body);  // Log received request

        const { email, password } = req.body;

        // Check if the user exists
        const user = await UserMod.findOne({ email });
        if (!user) {
            console.log('User not found with email:', email);  // Log user not found
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isMatch);  // Log password comparison result
        if (!isMatch) {
            console.log('Password does not match for user:', email);  // Log password mismatch
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        // Generate token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.APP_SECRET_KEY, { expiresIn: '1h' });
        console.log('Login successful for user:', email);  // Log successful login

        res.json({
            message: 'Successful login',
            token: token
        });
    } catch (error) {
        console.error('Error during login:', error);  // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};


const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({message: 'unauthorized user!'})
    }
    try {
        const decoded =jwt.verify(token, process.env.APP_SECRET_KEY)
        req.user = {id: decoded.userId};
        next();
    } catch (error) {
        
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
    verifyJWT
}