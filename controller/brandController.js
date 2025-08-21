const brandModel = require("../schema/brand");
const joi = require("joi");

const addNewBrand = async (req, res) => {
    const brandName = req.body.brandName;
    const newBrand = await brandModel.create({
        brandName, ownerId: req.decoded.ownerId
    });
     res.status(201).send({
        message: "Brand added successfully",
        newBrand
    });
}

const getAllBrands = async (req, res) => {
    try {
        console.log("get decoded value",req.decoded);
        const brand = await brandModel.find({});
        res.send(brand);
    } catch (error) {
        res.status(500).send({
            error
        });
    }
}

const updateBrand = async (req, res) => {
    const id = req.params.id;
    const brandName = req.body.brandName;
    
    // Validation schema for brand name
    const schema = joi.string().min(1).max(100).required();
    const {error} = schema.validate(brandName);
    
    if(error) {
        res.status(422).send({
            message: error.message
        });
        return;
    }
    
    // Check if brand exists
    const doesBrandExist = await brandModel.findById(id);
    if(!doesBrandExist) {
        res.send("brand does not exist");
        return;
    }
    
    // Update the brand name
    const brands = await brandModel.findByIdAndUpdate(id, {
        brandName: brandName
    }, {new: true});
    
    res.send({
        message: "Brand name updated successfully",
        brands
    });
};

const deleteBrand = async (req, res) => {
    const id = req.params.id;

    let deletedbrand = await brandModel.findByIdAndDelete(id);
    
    res.send({
        message: "Brand deleted successfully",
        deletedbrand
    });
}
module.exports = { 
    addNewBrand,
    updateBrand,
    getAllBrands,
    deleteBrand
}