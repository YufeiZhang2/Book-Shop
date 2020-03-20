const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
let url =
  "mongodb+srv://yufei:allenzhang@cluster0-h9mm0.mongodb.net/test?retryWrites=true&w=majority";
const mongoConnect = callback => {
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      _db = client.db("book-shop");
      callback();
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
