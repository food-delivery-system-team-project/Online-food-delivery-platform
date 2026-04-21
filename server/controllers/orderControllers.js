const Order = require("../models/Order");

//placing order
const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, location } = req.body;

    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      location,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//find all orders
const findUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "user",
      "name email",
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "unauthorized action" });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "cannot delete the process order" });
    }

    await Order.findByIdAndDelete(orderId);

    res.json({ success: true, message: "order deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { placeOrder, findUserOrders, deleteOrder };
