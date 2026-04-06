const food = require('../models/food')

//Get all food
const getFoods = async (req,res)=>{
    try {
        const foods = await food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({message:error.message});
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

