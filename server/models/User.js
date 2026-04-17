const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    address: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken:{
      type:String
    }
  },
  { timestamps: true },
);
    phone:{
        type:Number,

    },
    address:{
        type:String,
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default:"user"
    },
    
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);
