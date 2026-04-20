const User = require("../models/User");

const addfavoriteFood = async (req, res) => {
  try {
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({ message: "foodId is required" });
    }
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favorites.some((id) => id.toString() === foodId)) {
      user.favorites.push(foodId);
    }

    await user.save();

    await res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete food data
const deleteFavorite = async (req, res) => {
  try {
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({ message: "foodId is required" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    user.favorites = user.favorites.filter((id) => id.toString() !== foodId);
    await user.save();

    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//view all favorate food
const viewFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addfavoriteFood, deleteFavorite, viewFavorite };
