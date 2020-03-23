const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    reuqired: true
  }
});

module.exports = mongoose.model("Product", ProductSchema);

// // const Cart = require("./cart");
// const mongodb = require("mongodb");
// const getDb = require("../util/databse").getDB;

// module.exports = class Product {
//   constructor(title, imageUrl, price, description, id, userId) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//     this._id = id ? new mongodb.ObjectID(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOperations;
//     if (this._id) {
//       dbOperations = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOperations = db.collection("products").insertOne(this);
//     }
//     return dbOperations
//       .then(result => {})
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     //return a cursor
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then(products => {
//         // console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return (
//       db
//         .collection("products")
//         //need to cast string id to objectId type id stored in mongodb
//         .find({ _id: new mongodb.ObjectId(prodId) })
//         .next()
//         .then(product => {
//           return product;
//         })
//         .catch(err => {
//           console.log(err);
//         })
//     );
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: mongodb.ObjectID(prodId) })
//       .then(result => {})
//       .catch(err => {
//         console.log(err);
//       });
//   }
// };
