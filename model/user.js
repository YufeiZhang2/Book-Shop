const mongodb = require("mongodb");
const getDb = require("../util/databse").getDB;

module.exports = class User {
  constructor(username, email, cart, userId) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = userId ? new mongodb.ObjectID(userId) : null;
  }

  save() {
    const db = getDb();
    let dbOperations;
    if (this.id) {
      dbOperations = db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperations = db.collection("users").insertOne(this);
    }

    return dbOperations
      .then(result => {})
      .catch(err => {
        console.log(err);
      });
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(item => {
      return item.productId;
    });

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(product => {
          return {
            ...product,
            quantity: this.cart.items.find(item => {
              return item.productId.toString() === product._id.toString();
            }).quantity
          };
        });
      });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cartProduct => {
      return cartProduct.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    //update items added by this user in cart
    //if the product exists in cart
    if (cartProductIndex >= 0) {
      newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectID(product._id),
        quantity: newQuantity
      });
    }

    const updatedCart = {
      items: updatedCartItems
    };

    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  deleteItemFromCart(productId) {
    const updatedCart = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });
    console.log(updatedCart);

    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: { items: updatedCart } } });
  }

  addToOrder() {
    const db = getDb();
    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          users: {
            _id: this._id,
            name: this.name
          }
        };
        console.log(this._id);
        return db.collection("orders").insertOne(order);
      })
      .then(result => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "users._id": this._id })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectID(userId) })
      .next()
      .catch(err => {
        console.log(err);
      });
  }
};
