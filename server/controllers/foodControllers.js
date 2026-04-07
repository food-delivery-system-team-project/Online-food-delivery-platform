const food = require('../models/food')

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

    const foods = await food.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await food.countDocuments(query);

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
const addFood = async (req,res)=>{
   try {
    const {name,price,image,category} = req.body;
    const Food = new food({
        name,
        price,
        image,
        category
    });
    const saveFood = await Food.save();
    res.status(201).json(saveFood);
   } catch (error) {
    res.status(500).json({message:error.message})
   }
}

module.exports = {getFoods,addFood};

