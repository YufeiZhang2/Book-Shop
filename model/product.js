const Cart = require("./cart");
const getDb = require("../util/databse").getDB;

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    //tables
    db.collection("product")
      .insertOne(this)
      .then(result => {})
      .catch(err => {
        console.log(err);
      });
  }
};
