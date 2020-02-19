const path = require("path");
const fs = require("fs");

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
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductFromFile(products => {
      products.push(this);
      console.log(products);
      fs.writeFile(productPath, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAllProduct(cb) {
    getProductFromFile(cb);
  }
};
