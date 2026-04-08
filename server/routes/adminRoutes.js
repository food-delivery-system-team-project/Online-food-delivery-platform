const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/adminMiddleware');
const protect = require('../middleware/authMiddleware');
const {getAllOrders,updateOrderStatus,deleteFood} = require('../controllers/adminOrderController')

//admin only
router.get("/all",protect,isAdmin,getAllOrders);
router.put("/:id",protect,isAdmin,updateOrderStatus);
router.delete("/:id",protect,isAdmin,deleteFood);

module.exports = router;