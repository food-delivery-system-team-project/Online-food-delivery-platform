require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db')
const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes')
const cartRoutes = require('./routes/cartRoutes');
const adminDbRoutes = require('./routes/adminDbRoutes')

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/foods",foodRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders" , orderRoutes)
app.use("/api/admin" , adminRoutes);
app.use("/api/cart" , cartRoutes);
app.use("/api/adminDb",adminDbRoutes)

app.get('/',(req , res)=>{
 res.send("app is running");
})

const PORT = process.env.PORT||8000;

app.listen(PORT , () => {
    console.log(`server running is port ${PORT}`)
})