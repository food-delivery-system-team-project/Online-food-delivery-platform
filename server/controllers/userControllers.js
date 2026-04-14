const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const generateToken = require('../utils/generateToken')

//if user are register
const registerUser = async (req,res)=>{
 try {
   const {name, email, password,phone,address} = req.body;
   
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
    password: hashPassword,
    role: "user",
    phone,
    address
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

    const user = await User.findOne({email});
    if(!user){
    return res.status(400).json({message: "user not found"});
    }
    //password matching
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
    return res.status(400).json({message: "invalid password"});
    }

    // Generate Token 
    const token = generateToken(user._id);

    res.json({
        message: "login succesfully",
        token:token,
        user
    });
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

module.exports = {registerUser , userLogin};