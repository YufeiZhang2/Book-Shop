const Product = require("../model/product");
const Order = require("../model/order");

//updated
module.exports.getProducts = (req, res, next) => {
  Product.find()
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
  Product.find()
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
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      cartProducts = user.cart.items;
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
    .removeFromCart(productId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }).then(orders => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders
    });
  });
};

module.exports.postOrders = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(item => {
        return { quantity: item.quantity, product: { ...item.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user._id
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
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
