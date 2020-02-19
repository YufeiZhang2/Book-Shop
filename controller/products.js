const Product = require("../model/product");

module.exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add-product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

module.exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

module.exports.getProduct = (req, res, next) => {
  Product.fetchAllProduct(products => {
    console.log("controller", products);
    res.render("shop", {
      products: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCss: true
    });
  });
};
