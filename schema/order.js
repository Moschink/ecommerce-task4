const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");


const schema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers", // Reference to your user model
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Wrap schema into an array of objects

// schema.plugin(paginate);
const orderModel = mongoose.model("order", schema);

module.exports = orderModel;
