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
    refreshToken: {
      type: String,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpire: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

//auto delete only unvarified users
//use ttl and with partial index
userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 2*24*60*60, // 2days
    partialFilterExpression: { isVarified: false },
  },
);

module.exports = mongoose.model("User", userSchema);
