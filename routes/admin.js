const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");

// /admin/add-product-add => get
router.get("/add-product", adminController.getAddProduct);

router.get("/products", adminController.getProducts);

// /admin/add-product-add => post
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
