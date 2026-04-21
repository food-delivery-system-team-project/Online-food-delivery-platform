const express = require("express");
const router = express.Router();

const {
  placeOrder,
  findUserOrders,
  deleteOrder,
} = require("../controllers/orderControllers");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, placeOrder);
router.get("/", protect, findUserOrders);
router.delete("/delete/:orderId", protect, deleteOrder);

module.exports = router;
