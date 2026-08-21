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
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    pinCode: {
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
    otpLastSent: {
      type: Date,
    },
    isOtpSent: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
  },
  { timestamps: true },
);

//auto delete only unvarified users
//use ttl and with partial index
userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 2 * 24 * 60 * 60, // 2days
    partialFilterExpression: { isVarified: false },
  },
);

module.exports = mongoose.model("User", userSchema);
