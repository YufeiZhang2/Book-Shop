const Product = require("../model/product");

module.exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add-product",
    path: "/admin/add-product",
    editing: false
  });
};

module.exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

module.exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render("admin/edit-product", {
      pageTitle: "Edit-product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  });
};

module.exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

module.exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect("/admin/products");
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAllProduct(products => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};
