const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    ownerId: {
       type: mongoose.Types.ObjectId,
       ref: "admin",  // Reference to your user model
       required: true,
    }
    }, {
    timestamps: true
});

const brandModel = mongoose.model("brand", schema);

module.exports = brandModel;
