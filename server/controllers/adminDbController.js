const User = require('../models/User')
const Order = require('../models/Order')

const getDashboard = async (req,res) =>{
    try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
        // store running total 
        //example (0,100) = 0+100
        //(100,300) = 100+300 => 400 is acc value
        (acc,item)=> acc+item.totalAmount,
        0
    )

    const recentOrders = await Order.find()
      .sort({createdAt: -1})
      .limit(5)
      .populate("user","name email");

      res.json({
        totalUsers,
        totalOrders,
        totalRevenue,
        recentOrders,
        pendingOrders  
      })
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const updateOrderStatus = async (req,res)=>{
    try {
        const {status} = req.body;

        const order = await Order.findById(req.params.id);

        if(!order){
            return res.status(404).json({message: "Order not Found"})
        }

        const validStatus = ["pending", "processing", "shipped", "delivered"];

        order.status = status || order.status;
        if (!validStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
        }

        await order.save();

        res.json({
            message: "order status updated",
            order
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getDashboard,updateOrderStatus};