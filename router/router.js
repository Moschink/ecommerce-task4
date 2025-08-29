const express = require("express");

const router = express.Router();
const checkedIfLoggedIn = require("../middleware/checkedIfLoggedIn");
const productController = require("../controller/productController");
const orderController = require("../controller/orderController");
const brandController = require("../controller/brandController");
const profileController = require("../controller/profileController");

const roleBasedAccess = require("../middleware/roleBasedAccess");


router.use(checkedIfLoggedIn);


//Profile & Oder-History routel
router.get("/order-history", profileController.orderHistory);
router.get("/profile", profileController.profile);


// PRODUCT routes
router.get("/products/:page/:limit", productController.getAllproducts);
router.post("/products", roleBasedAccess(["admin"]), productController.addNewproduct);
router.get("/products/:id", productController.viewSingleproduct);
router.patch("/products/:id", roleBasedAccess(["admin"]), productController.updateproductStatus);
router.delete("/products/:id", roleBasedAccess(["admin"]), productController.deleteproduct);

// ORDER routes
router.post("/orders", roleBasedAccess(["customer"]), orderController.createOrder);
router.get("/orders", roleBasedAccess(["admin"]), orderController.getAllOrders);
router.get("/orders/:id", roleBasedAccess(["admin"]), orderController.getOrder);
router.patch("/orders/:id/shipping", roleBasedAccess(["admin"]), orderController.updateShippingStatus);

// BRAND routes
router.post("/brands", roleBasedAccess(["admin"]), brandController.addNewBrand);
router.put("/brands/:id", brandController.updateBrand);
router.get("/brands", brandController.getAllBrands);
router.delete("/brands/:id", roleBasedAccess(["admin"]), brandController.deleteBrand);






module.exports = router;
