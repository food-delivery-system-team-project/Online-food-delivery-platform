const express = require("express");
const router = express.Router();

const {
  getDashboard
  ,getAllUser
} = require("../controllers/adminDbController");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.get("/dashboard", protect, isAdmin, getDashboard);
module.exports = router;
