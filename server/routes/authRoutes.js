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

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTPAndRegister);
router.post("/resend-otp", resendOTP);
router.post("/login", userLogin);
router.post("/refreshToken", refreshToken);
router.post("/logout", protect, logout);

module.exports = router;
