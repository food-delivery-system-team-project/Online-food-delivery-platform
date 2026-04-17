const express = require("express");
const router = express.Router();
const {
  registerUser,
  userLogin,
  refreshToken,
  logout,
} = require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");

router.post("/login", userLogin);
router.post("/register", registerUser);
router.post("/refreshToken", refreshToken);
router.post("/logout", protect, logout);

module.exports = router;
