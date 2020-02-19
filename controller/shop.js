const Product = require("../model/product");

module.exports.getProduct = (req, res, next) => {
  Product.fetchAllProduct(products => {
    res.render("shop/product-list", {
      products: products,
      pageTitle: "All Products",
      path: "/products"
    });
  });
};

module.exports.getIndex = (req, res, next) => {
  Product.fetchAllProduct(products => {
    res.render("shop/index", {
      products: products,
      pageTitle: "Shop",
      path: "/index"
    });
  });
};

module.exports.getCart = (req, res, next) => {
  Product.fetchAllProduct(products => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart"
    });
  });
};

module.exports.getOrders = (req, res, next) => {
  Product.fetchAllProduct(products => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders"
    });
  });
};

module.exports.getCheckout = (req, res, next) => {
  Product.fetchAllProduct(products => {
    res.render("shop/checkout", {
      path: "/checkout",
      pageTitle: "Checkout"
    });
  });
};
