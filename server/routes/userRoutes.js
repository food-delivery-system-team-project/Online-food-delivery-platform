const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getUserProfile,
  updateUserProfile,
  changepassword,
} = require("../controllers/userControllers");

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("image"), updateUserProfile);
router.put("/change-password", protect, changepassword);

module.exports = router;
