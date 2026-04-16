const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  registerUser,
  userLogin,
  getUserProfile,
  updateUserProfile,
  changepassword,
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("image"), updateUserProfile);
router.put("/change-password", protect, changepassword);

module.exports = router;
