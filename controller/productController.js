// const transporter = require("../utility/sendEmail");
const productModel = require("../schema/product");
const joi = require("joi");

const getAllproducts = async (req, res) => {
    try {
        console.log("get decoded value",req.decoded);
        const product = await productModel.find({});
        res.send(product);
    } catch (error) {
        res.status(500).send({
            error
        });
    }
}


const addNewproduct = async (req, res) => {
    
    const productName = req.body.productName;
    const description = req.body.description;
    const cost = req.body.cost;
    productImage = req.body.productImage;

    const newProduct = await productModel.create({
        productName, description, cost, productImage, ownerId: req.decoded.userId
    });

    // transporter.sendMail({
    //     from: "ukokjnr@gmail.com",
    //     to: "ukokjnr@gmail.com",
    //     subject: "product [[Create product]]",
    //     html: `
    //         <h1>You've added a new product: ${req.body.title}</h1>
    //         <div>${req.body.description}</div>
    //     `
    // });

    res.status(201).send({
        message: "product added successfully",
        newProduct
    });
}

const viewSingleproduct = async (req, res) => {
    const id = req.params.id;

    const product = await productModel.findById(id);

    if(!product) {
        res.status(404).send({
            message: "No product found"
        });
        return;
    }

    res.send({
        message: "product found",
        product
    });

}

const updateproductStatus = async (req, res) => {
    const id = req.params.id;
    const isDone = req.body.isDone;

    const schema = joi.string().valid("pending", "ongoing", "completed").required();

    const {error} = schema.validate(isDone);

    if(error) {
        res.status(422).send({
            message: error.message
        });
        return;
    }

    const doesproductExist = await productModel.findById(id);

    if(!doesproductExist) {
        res.send("product does not exist");
        return;
    }

    const product = await productModel.findByIdAndUpdate(id, {
        productStatus: isDone
    }, {new: true});

    res.send({
        message: "product updated successfully",
        product
    });
}

const deleteproduct = async (req, res) => {
    const id = req.params.id;

    let deletedproduct = await productModel.findByIdAndDelete(id);
    
    res.send({
        message: "product deleted successfully",
        deletedproduct
    });
}

module.exports = {
    addNewproduct,
    getAllproducts,
    viewSingleproduct,
    updateproductStatus,
    deleteproduct
}
