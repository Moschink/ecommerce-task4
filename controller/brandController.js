const brandModel = require("../schema/brand");
const joi = require("joi");

const addNewBrand = async (req, res) => {
  try {
    const brandName = req.body.brandName;

    const newBrand = await brandModel.create({
      brandName,
      ownerId: req.decoded.ownerId
    });

    res.status(201).send({
      message: "Brand added successfully",
      newBrand
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


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
    try {
        const id = req.params.id;
        const { brandName } = req.body;
        
        // Check if brand exists
        const doesBrandExist = await brandModel.findById(id);
        if (!doesBrandExist) {
            return res.status(404).json({
                error: "Brand does not exist"
            });
        }
        
        // Update the brand name
        const updatedBrand = await brandModel.findByIdAndUpdate(
            id, 
            { brandName }, 
            { new: true }
        );
        
        res.status(200).json({
            message: "Brand name updated successfully",
            brand: updatedBrand
        });
        
    } catch (error) {
        console.error('Error updating brand:', error);
        res.status(500).json({
            error: "Failed to update brand",
            details: error.message
        });
    }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    // delete by brandId (since you use it for referencing)
    const brand = await brandModel.findOneAndDelete({ brandId: id });

    if (!brand) {
      return res.status(404).json({
        error: "Brand not found",
        providedId: id,
      });
    }

    res.status(200).json({
      message: "Brand deleted successfully",
      deletedBrand: brand,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
    addNewBrand,
    updateBrand,
    getAllBrands,
    deleteBrand
}