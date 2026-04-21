const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyOTPAndRegister,
  resendOTP,
  userLogin,
  refreshToken,
  logout,
} = require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");
const { loginLimiter, otpLimiter } = require("../middleware/authLimiter");

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTPAndRegister);
router.post("/resend-otp", otpLimiter, resendOTP);
router.post("/login", loginLimiter, userLogin);
router.post("/refreshToken", refreshToken);
router.post("/logout", protect, logout);

module.exports = router;
