const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  addfavoriteFood,
  deleteFavorite,
  viewFavorite,
} = require("../controllers/favorateFoodControllers");

router.post("/add", protect, addfavoriteFood);
router.post("/delete", protect, deleteFavorite);
router.get("/allFavorite", protect, viewFavorite);

module.exports = router;
