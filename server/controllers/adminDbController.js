const User = require("../models/User");
const Order = require("../models/Order");

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      // store running total
      //example (0,100) = 0+100
      //(100,300) = 100+300 => 400 is acc value
      (acc, item) => acc + item.totalAmount,
      0,
    );

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email");

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      recentOrders,
      pendingOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard};
