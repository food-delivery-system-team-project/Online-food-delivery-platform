const rateLimit = require("express-rate-limit");

//login limiter

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "too many login attemps",
});

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: "Too many OTP requests",
});

module.exports = { loginLimiter, otpLimiter };
