const mongoose = require('mongoose')

const connectDB = async () => {
 try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("database are connected")
 } catch (error) {
    console.log('DB error',error.message);
    process.exit(1);
 }
};

module.exports = connectDB;
