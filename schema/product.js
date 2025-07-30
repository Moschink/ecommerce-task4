const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    cost: {
        type: Number,  // Changed to Number type
        required: true
    },
     description: {
        type: String,
        required: true
    },
    productImage: [{
        type: String  // Array of image URLs/paths
    }],
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "admin",  // Reference to your user model
        required: true
    },
    stockStatus: {
        type: String,
        enum: ["pending", "ongoing", "completed"],
        default: "pending"
    }
   
}, {
    timestamps: true
});

const productModel = mongoose.model("product", schema);

module.exports = productModel;
