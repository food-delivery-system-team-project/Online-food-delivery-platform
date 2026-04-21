const express = require("express");
const router = express.Router();

const {
  getFoods,
  addFood,
  addRating,
} = require("../controllers/foodControllers");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

//get foods
router.get("/", getFoods);

router.post("/", protect, isAdmin, upload.single("image"), addFood);

router.post("/rating", protect, addRating);

module.exports = router;
