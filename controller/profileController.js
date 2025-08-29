const userModel = require("../schema/user");
const orderModel = require("../schema/order");
// const checkIfLoggedIn = require("../middleware/checkIfLoggedIn");

const joi = require("joi");

// GET /profile
const profile = async (req, res) => {
  try {
    const user = await userModel.findById(req.decoded.ownerId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const orderHistory = async (req, res) => {
  try {
    let orders;
    if (req.decoded.role === "admin") {
      orders = await orderModel.find();
    } else {
       orders = await orderModel.find({ ownerId: req.decoded.ownerId });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    profile,
    orderHistory
}