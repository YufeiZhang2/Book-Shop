const Product = require("../model/product");

//updated
module.exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("shop/product-list", {
        products: products,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getSingleProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//updated
module.exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("shop/index", {
        products: products,
        pageTitle: "Shop",
        path: "/index"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getCart = (req, res, next) => {
  req.user.getCart().then(cartProducts => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartProducts
    });
  });
};

module.exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteItemFromCart(productId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getOrders = (req, res, next) => {
  req.user.getOrders().then(orders => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders
    });
  });
};

module.exports.postOrders = (req, res, next) => {
  req.user
    .addToOrder()
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => {
      console.log(err);
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
