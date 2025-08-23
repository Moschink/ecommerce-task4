const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const schema = new mongoose.Schema({
    // brandId: {
    //     type: String,
    //     required: true
    // },
     ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",  // Reference to your user model
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand", // Reference to your brand model
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
   
    stockStatus: {
        type: String,
        enum: ["pending", "ongoing", "completed"],
        default: "pending"
    }
   
}, {
    timestamps: true
});

schema.plugin(paginate);
const productModel = mongoose.model("product", schema);

module.exports = productModel;
