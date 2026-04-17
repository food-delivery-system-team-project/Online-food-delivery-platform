const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    prepTime: {
      type: String,
      required: true,
    },
    ratings: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          value: {
            type: Number,
            min: 1,
            max: 5,
          },
        },
      ],
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    storeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Food", foodSchema);
