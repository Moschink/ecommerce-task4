const productModel = require("../schema/product");
const orderModel = require("../schema/order");
const joi = require("joi");

const createOrder = async (req, res) => {
  try {
    const { productName, productId, quantity, totalCost, shippingStatus } = req.body;

    // Validate product existence
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    // Create order
    const newOrder = await orderModel.create({
      productName,
      productId,
      quantity,
      totalCost,
      shippingStatus, // must match enum: pending | shipped | delivered
      ownerId: req.decoded.ownerId,
    });

    res.status(201).send({
      message: "Order added successfully",
      newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getAllOrders = async (req, res) => {
    try {
        console.log("get decoded value",req.decoded);
        const orders = await orderModel.find({});
        res.send(orders);
    } catch (error) {
        res.status(500).send({
            error
        });
    }
}
const getOrder = async (req, res) => {
  const id = req.params.id; // <-- use params, not body

  try {
    console.log("get decoded value", req.decoded);

    const order = await orderModel.findById(id); // <-- pass id directly

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};




const updateShippingStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const shippingStatus = req.body.shippingStatus;

    // Joi validation for shippingStatus
    const schema = joi
      .string()
      .valid("pending", "shipped", "delivered")
      .required();

    const { error } = schema.validate(shippingStatus);

    if (error) {
      return res.status(422).send({
        message: error.message,
      });
    }

    // Check if product exists
    const doesOrderExist = await orderModel.findById(id);

    if (!doesOrderExist) {
      return res.status(404).send({
        message: "Order does not exist",
      });
    }

    // Update shippingStatus
    const order = await orderModel.findByIdAndUpdate(
      id,
      { shippingStatus: shippingStatus }, // <-- Correct field
      { new: true }
    );

    return res.send({
      message: "Shipping status updated successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Internal server error",
    });
  }
};

        

module.exports = { 
    createOrder,
    getOrder,
    getAllOrders,
    updateShippingStatus
}