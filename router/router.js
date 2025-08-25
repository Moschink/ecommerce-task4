const express = require("express");

const router = express.Router();
const checkedIfLoggedIn = require("../middleware/checkedIfLoggedIn");
const productController = require("../controller/productController");
const brandController = require("../controller/brandController");
const roleBasedAccess = require("../middleware/roleBasedAccess");


router.use(checkedIfLoggedIn);
// product Router

router.get("/:page/:limit", productController.getAllproducts);
router.post("/product", roleBasedAccess(["admin"]), productController.addNewproduct);
router.get("/single/:id", productController.viewSingleproduct);
router.patch("/:id", roleBasedAccess(["admin"]), productController.updateproductStatus);
router.delete("/:id", roleBasedAccess(["admin"]),productController.deleteproduct);


router.post("/new", roleBasedAccess(["admin"]), brandController.addNewBrand);
router.put("/:id", brandController.updateBrand);
router.get("/view", brandController.getAllBrands);
router.delete("/delete/:id", roleBasedAccess(["admin"]), brandController.deleteBrand);



module.exports = router;
