const express = require("express");
const router = express.Router();

const {
  getDashboard,
  updateOrderStatus,
} = require("../controllers/adminDbController");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.get("/dashboard", protect, isAdmin, getDashboard);
router.put("/order/:id", protect, isAdmin, updateOrderStatus);

module.exports = router;
