const Order = require('../models/Order');

//placing order
const placeOrder = async (req , res) =>{
    try {
        const {items ,totalAmount} = req.body;

        const order = new Order({
            user: req.user.id,
            items,
            totalAmount
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//find all orders

const findUserOrders = async (req,res)=>{
try {
    const orders = await Order.find({user:req.user.id});
    res.json(orders);
} catch (error) {
    res.status(500).json({message: error.message})
}
}

module.exports = {placeOrder, findUserOrders};