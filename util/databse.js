const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = () => {
  MongoClient.connect(
    "mongodb+srv://yufei:KL3vd6zNBmsZpe8G@cluster0-ohllh.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
    .then(client => {
      _db = client.db("book-shop");
    })
    .catch(err => {
      console.log(err);
      throw "databse connection fails";
    });
};

//pattern for mogodb to maintain connections efficeintly when working
//with multiple simoutanously operations
const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No db found";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
