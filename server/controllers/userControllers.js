const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//if user are register
const registerUser = async (req,res)=>{
 try {
   const {name, email, password,role} = req.body;
   
   //check user is already exist
   const userExist = await User.findOne({email});
   if(userExist){
    return res.status(400).json({message:"user already exists"})
   }

   // password hashing
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password,salt);

   //create user
   const user = await User.create({
    name,
    email,
    password: hashPassword
   });

   res.status(201).json({
    message:"user register success",user
   })
 } catch (error) {
    res.status(500).json({message: error.message});
 }
};

//User Login

const userLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;

    const user = await User.findOne({ email });
    if(!user) {
        return res.status(400).json({message: "invalid email or password"});
    }

    // Generate Token 
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    );

    res.json({
        message: "login succesfully",
        token,
        user
    });
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

module.exports = {registerUser , userLogin};