const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type:String
    },
    category: {
        type:String,    
    },
    prepTime:{
        type: String,
        required: true
    },
    isSaved:{
        type:Boolean,   
    },
    rating:{
        type:Number,
    },
    totalRating:{
       type:Number
    },
    storeName:{
        type: String,
        required:true
    }

},{timestamps: true});

module.exports = mongoose.model("Food",foodSchema);