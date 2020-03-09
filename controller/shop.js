const Product = require("../model/product");
const Cart = require("../model/cart");

module.exports.getProducts = (req, res, next) => {
  Product.fetchAllProduct(products => {
    res.render("shop/product-list", {
      products: products,
      pageTitle: "All Products",
      path: "/products"
    });
  });
};

module.exports.getSingleProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    console.log(product);
    res.render("shop/product-details", {
      product: product,
      pageTitle: product.title,
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
  Cart.getCart(cart => {
    if (!cart) return res.redirect("/cart");
    Product.fetchAllProduct(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          cartProduct => cartProduct.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts
      });
    });
  });
};

module.exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(product.id, product.price);
  });
  res.redirect("/cart");
};

module.exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
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
