const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

// /admin/add-product-add => get
router.get("/add-product", productController.getAddProduct);

// /admin/add-product-add => post
router.post("/add-product", productController.postAddProduct);

module.exports = router;
