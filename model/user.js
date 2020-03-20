const mongodb = require("mongodb");
const getDb = require("../util/databse").getDB;

module.exports = class User {
  constructor(username, email, userId) {
    this.name = username;
    this.email = email;
    this.id = userId ? new mongodb.ObjectID(userId) : null;
  }

  save() {
    const db = getDb();
    let dbOperations;
    if (this.id) {
      dbOperations = db
        .collection("users")
        .updateOne({ _id: this.id }, { $set: this });
    } else {
      dbOperations = db.collection("users").insertOne(this);
    }

    return dbOperations
      .then(result => {})
      .catch(err => {
        console.log(err);
      });
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
