const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} = require("../controllers/cartContollers");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:foodId", protect, removeFromCart);
router.put("/:foodId", protect, updateCart);

module.exports = router;
