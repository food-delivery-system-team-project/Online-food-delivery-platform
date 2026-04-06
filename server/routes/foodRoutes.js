const express = require('express');
const router = express.Router();

const {getFoods,addFood} = require('../controllers/foodControllers')
const protect = require('../middleware/authMiddleware')
const isAdmin = require('../middleware/adminMiddleware')

//get foods
router.get("/",getFoods);

//add food
router.post('/',addFood);

router.post("/",protect,isAdmin,addFood);

module.exports = router;