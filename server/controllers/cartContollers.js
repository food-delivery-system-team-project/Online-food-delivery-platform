const Cart = require("../models/Cart");

//function add to Cart
const addToCart = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      //  Create new cart
      cart = new Cart({
        user: req.user.id,
        items: [{ food: foodId, quantity }],
      });
    } else {
      //  Find item index
      const itemIndex = cart.items.findIndex(
        (item) => item.food.toString() === foodId,
      );

      //  If item exists → increase quantity
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If item not exists → add new item
        cart.items.push({ food: foodId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.food",
    );

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    cart.items = cart.items.filter(
      (item) => item.food.toString() !== req.params.foodId,
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart.items.find(
      (item) => item.food.toString() === req.params.foodId,
    );

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart, updateCart };
