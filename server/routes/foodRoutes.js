const express = require("express");
const router = express.Router();

const {
  getFoods,
  addRating,
} = require("../controllers/foodControllers");
const protect = require("../middleware/authMiddleware");

//get foods
router.get("/", getFoods);
router.post("/rating", protect, addRating);

module.exports = router;
