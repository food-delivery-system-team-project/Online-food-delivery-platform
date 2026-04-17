const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshTokne,
} = require("../utils/generateToken");

//if user are register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //check user is already exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exists" });
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role: "user",
      phone,
      address,
    });

    res.status(201).json({
      message: "user register success",
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

module.exports = { registerUser, userLogin, refreshToken, logout };
