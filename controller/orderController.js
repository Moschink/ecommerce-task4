const productModel = require("../schema/product");
const orderModel = require("../schema/order");
const joi = require("joi");
const { notifyUser } = require("../socket"); 


// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "productId and quantity are required" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalCost = product.cost * quantity;

    const newOrder = await orderModel.create({
      ownerId: req.decoded.ownerId,
      productId: product._id,
      productName: product.productName,
      productDescription: product.description,
      totalCost,
      quantity,
      shippingStatus: "pending",
    });

    // Emit event for new order (optional)
    // io.emit("notification", {
    //   title: "New order created",
    //   message: `Order for ${product.productName} has been placed.`,
    //   order: newOrder,
    // });

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    console.log("get decoded value", req.decoded);
    const orders = await orderModel.find({});
    res.send(orders);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getOrder = async (req, res) => {
  const id = req.params.id;

  try {
    console.log("get decoded value", req.decoded);
    const order = await orderModel.findById(id);

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

    const schema = joi.string().valid("pending", "shipped", "delivered").required();
    const { error } = schema.validate(shippingStatus);
    if (error) {
      return res.status(422).send({ message: error.message });
    }

    const order = await orderModel.findByIdAndUpdate(
      id,
      { shippingStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

  
   notifyUser(order.ownerId.toString(), { 
  orderId: order._id,
  shippingStatus,
  message: `Hello ${order.ownerId}, your order status has been updated`
});


    return res.send({
      message: "Shipping status updated successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};


module.exports = {
  createOrder,
  getOrder,
  getAllOrders,
  updateShippingStatus,
 // export this so you can set io in server.js
};
