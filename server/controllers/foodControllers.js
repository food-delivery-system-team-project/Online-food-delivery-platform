const Food = require('../models/Food')
const cloudinary = require("../config/cloudinary");

//Get all food
const getFoods = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 5, sort } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    let sortOption = {};

    if (sort === "low") sortOption.price = 1;
    if (sort === "high") sortOption.price = -1;

    const foods = await Food.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Food.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      foods
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Add food

const addFood = async (req, res) => {
  try {
    
    const { name, price, category,isSaved,storeName,rating,totalRating,prepTime } = req.body;

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
      isSaved,
      rating,
      totalRating,
      storeName,
      prepTime
    });

    const savedFood = await food.save();

    res.json(savedFood);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {getFoods,addFood};

