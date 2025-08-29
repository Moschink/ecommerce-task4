const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");


const schema = new mongoose.Schema({
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  productId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Product", 
     required: true 
    },
  productName: {
    type: String, 
    required: true 
  },
  productDescription: {
    type: String 
    },
  totalCost: {
    type: Number, 
    required: true 
    },
  quantity: {
    type: Number,
    required: true 
  },
  shippingStatus: {
    type: String,
    default: "pending" 
  }
}, {
  timestamps: true 
});

// Wrap schema into an array of objects

// schema.plugin(paginate);
const orderModel = mongoose.model("order", schema);

module.exports = orderModel;
