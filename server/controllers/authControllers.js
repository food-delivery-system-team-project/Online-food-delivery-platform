const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshTokne,
} = require("../utils/generateToken");
const generateOPT = require("../utils/otpGenerator");
const sendOTPEmail = require("../utils/sendOTPEmail");
const generateOTP = require("../utils/otpGenerator");

//user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //check user is already exist
    let user = await User.findOne({ email });
    if (user && user.isVarified) {
      return res.status(400).json({ message: "user already exists" });
    }

    //generate otp
    const otp = generateOPT();

    const salt = await bcrypt.genSalt(10);

    //hash otp
    const hashOTP = await bcrypt.hash(otp, salt);

    // password hashing
    const hashPassword = await bcrypt.hash(password, salt);

    if (!user) {
      user = await User.create({
        name,
        email,
        password: hashPassword,
        phone,
        address,
        otp: hashOTP,
        otpExpire: Date.now() + 5 * 60 * 1000,
      });
    } else {
      user.name = name;
      user.password = hashPassword;
      user.phone = phone;
      user.address = address;
      user.otp = hashOTP;
      user.otpExpire = Date.now() + 5 * 60 * 1000;

      await user.save();
    }

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

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVarified) {
      return res.status(400).json({ message: "already varified" });
    }

    //compare hash otp

    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "otp expired" });
    }

    user.isVarified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.status(201).json({
      message: "user registration success",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVarified) {
      return res.status(400).json({ message: "user already verify" });
    }

    const otp = generateOPT();

    const salt = await bcrypt.genSalt(10);
    const hashOTP = await bcrypt.hash(otp, salt);

    user.otp = hashOTP;
    user.otpExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendOTPEmail(email, otp);

    res.json({
      message: "new OTP sent successfully",
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

    if (!user.isVarified) {
      return res
        .status(403)
        .json({ message: "please verify your email before login" });
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
  resendOTP,
  userLogin,
  refreshToken,
  logout,
};
