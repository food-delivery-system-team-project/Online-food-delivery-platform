const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshTokne,
} = require("../utils/generateToken");
const transporter = require("../config/mail");
const generateOPT = require("../utils/otpGenerator");
const sendOTPEmail = require("../utils/sendOTPEmail");

const tempUsers = {};

//user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //check user is already exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exists" });
    }

    //generate otp
    const otp = generateOPT();

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //store temp data
    tempUsers[email] = {
      name,
      email,
      password: hashPassword,
      phone,
      address,
      otp,
      otpExpire: Date.now() + 5 * 60 * 1000,
    };

    await sendOTPEmail(email, otp);

    res.status(200).json({
      message: "otp sent to email.please verify..",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//verify otp then save the data
const verifyOTPAndRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const tempUser = tempUsers[email];

    if (!tempUser) {
      return res.status(400).json({ message: "No otp request" });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (tempUser.otpExpire < Date.now()) {
      return res.status(400).json({ message: "otp expired" });
    }

    //create real user
    const user = await User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      phone: tempUser.phone,
      address: tempUser.address,
      role: "user",
    });

    //remove tempUsers[email];

    res.status(201).json({
      message: "user registration success",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    //password matching
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    // Generate Token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshTokne(user._id);

    user.refreshToken = refreshToken;

    res.json({
      message: "login succesfully",
      token: {
        accessToken,
        refreshToken,
      },
      user,
    });

    await user.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }

  const user = await User.findOne({ refreshToken: token });

  if (!user) {
    return res.status(403).json({ message: "invalid refresh token" });
  }
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "token expire" });
    }

    const newAccessToken = generateAccessToken(user._id);

    res.json({ accessToken: newAccessToken });
  });
};

const logout = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.refreshToken = null;
  await user.save();

  res.json({ message: "logged out successfully" });
};

module.exports = {
  registerUser,
  verifyOTPAndRegister,
  userLogin,
  refreshToken,
  logout,
};
