const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    brandId: {
      type: String,
      unique: true, // ensures no duplicates
    },
  },
  {
    timestamps: true,
  }
);

// Always sync brandId with _id
schema.pre("save", function (next) {
  if (!this.brandId) {
    this.brandId = this._id.toString();
  }
  next();
});

const brandModel = mongoose.model("brand", schema);

module.exports = brandModel;
