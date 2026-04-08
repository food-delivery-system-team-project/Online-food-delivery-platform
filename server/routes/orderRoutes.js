const express = require('express');
const router = express.Router();

const {placeOrder, findUserOrders} = require('../controllers/orderControllers');
const protect = require('../middleware/authMiddleware');

router.post("/",protect,placeOrder);
router.get("/",protect,findUserOrders);

module.exports = router;