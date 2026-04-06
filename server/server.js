require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db')
const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/foods",foodRoutes);
app.use("/api/users", userRoutes);

app.get('/',(req , res)=>{
 res.send("app is running");
})

const PORT = process.env.PORT||8000;

app.listen(PORT , () => {
    console.log(`server running is port ${PORT}`)
})