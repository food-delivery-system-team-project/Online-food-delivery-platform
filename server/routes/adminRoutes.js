const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getAllOrders,
  updateOrderStatus,
  deleteFood,
  getAllUser,
  addFood,
  updateFood,
  getOrderById,
} = require("../controllers/adminController");

//admin only
router.get("/all/orders", protect, isAdmin, getAllOrders);
router.put("/updateOrder/:id", protect, isAdmin, updateOrderStatus);
router.post("/addFood", protect, isAdmin, upload.single("image"), addFood);
router.put("/updateFood/:id", protect, isAdmin, upload.single("image"), updateFood);
router.delete("/deleteFood/:id", protect, isAdmin, deleteFood);
router.get("/orders/:id", protect, isAdmin, getOrderById);

module.exports = router;
