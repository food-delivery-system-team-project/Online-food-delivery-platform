const Order = require('../models/Order');
const Food = require('../models/Food')

//get all order
const getAllOrders = async (req,res) =>{
  try {
    const orders = await Order.find({user:req.user.id}).populate("user","name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

//update order status
const updateOrderStatus = async (req,res)=>{
    try {
        const {status} = req.body;

        const order = await Order.findById(req.params.id);

        if(!order){
            return res.status(404).json({message:"order not found"});
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//deleting food
const deleteFood = async (req,res)=>{
    try {
        const food = Food.findById(req.params.id);

        if(!food){
            return res.status(404).json({message:"food not found"})
        }

        await food.deleteOne();
        res.json({message: "food deleted succesfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports= {getAllOrders,updateOrderStatus,deleteFood};