const Order = require("../models/Order");
const Food = require("../models/food");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

//get all order
const getAllOrders = async (req, res) => {
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

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    order.status = status;
    await order.save();

    //send real time order status;
    const io = req.app.get("io");

    io.to(order.userId, toString()).emit("orderUpdated", {
      ordeId: order._id,
      status: order.status,
    });
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Add food

const addFood = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      storeName,
      ratings,
      averageRating,
      prepTime,
    } = req.body;

    let image = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      image = result.secure_url;
    }

    const food = new Food({
      name,
      price,
      category,
      image,
      ratings,
      averageRating,
      storeName,
      prepTime,
    });

    const savedFood = await food.save();

    res.json(savedFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      price,
      category,
      storeName,
      prepTime,
    } = req.body;

    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    food.name = name;
    food.price = price;
    food.category = category;
    food.storeName = storeName;
    food.prepTime = prepTime;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path
      );

      food.image = result.secure_url;
    }

    const updatedFood = await food.save();

    res.status(200).json(updatedFood);
  } catch (error) {
    console.error("Update food error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

//deleting food

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "food not found" });
    }

    await food.deleteOne();
    res.json({ message: "food deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUser = async (req, res) =>{
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAllOrders, updateOrderStatus, deleteFood, getAllUser , addFood, updateFood ,getOrderById};
