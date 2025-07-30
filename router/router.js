const express = require("express");

const router = express.Router();
const checkedIfLoggedIn = require("../middleware/checkedIfLoggedIn");
const productController = require("../controller/productController");
const roleBasedAccess = require("../middleware/roleBasedAccess");


router.use(checkedIfLoggedIn);
// product Router

router.get("/", productController.getAllproducts);
router.post("/product", roleBasedAccess(["admin","customer"]), productController.addNewproduct);
router.get("/single/:id", productController.viewSingleproduct);
router.patch("/:id", productController.updateproductStatus);
router.delete("/:id", roleBasedAccess(["admin"]),productController.deleteproduct);

module.exports = router;
