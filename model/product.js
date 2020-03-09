const path = require("path");
const fs = require("fs");
const Cart = require("./cart");

const productPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductFromFile = cb => {
  fs.readFile(productPath, (err, fileContent) => {
    let arr = Buffer.from(fileContent);
    if (arr.length === 0) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductFromFile(products => {
      //updated existing product
      console.log("id", this.id);
      if (this.id) {
        const existingProductIndex = products.findIndex(
          product => this.id === product.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(productPath, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
        //add a new product
      } else {
        this.id = Math.random().toString();
        products.push(this);
        console.log(products);
        fs.writeFile(productPath, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductFromFile(products => {
      const product = products.find(product => product.id === id);
      const updateProducts = products.filter(product => product.id !== id);
      fs.writeFile(productPath, JSON.stringify(updateProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAllProduct(cb) {
    getProductFromFile(cb);
  }

  static findById(id, cb) {
    getProductFromFile(products => {
      const product = products.find(product => product.id === id);
      console.log(product);
      cb(product);
    });
  }
};
