const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items:[
        {
            name:String,
            price:Number,
            quantity:Number
        }
    ],
    totalAmount:{
       type:Number
    },
    status:{
        type:String,
        default: "pending"
    },
    location:{
        type: String,   
    }

},{timestamps:true});

module.exports = mongoose.model("Order" , orderSchema);