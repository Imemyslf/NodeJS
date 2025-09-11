// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'nodecomplete', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;

let _db;
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url =
  "mongodb+srv://studygrind96_db_user:FbAFACl8H2EWYZF9@cluster0.ri3r904.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const mongoConnect = (cb) => {
  MongoClient.connect(url)
    .then((client) => {
      // console.log("Connected:", client);
      // console.log("client.db('shop') :\n", client.db("shop"), "\n");
      _db = client.db("shop");
      console.log(
        "_db.collection('products').find()",
        _db
          .collection("products")
          .find()
          .toArray()
          .then((result) => console.log(result))
          .catch((err) => comsole.log(err))
      );
      // console.log(_db);
      cb();
      // throw "Cannot cnnect to database";
    })
    .catch((err) => {
      console.log("Mongodb err:", err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No Database found";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
// module.exports = mongoConnect;
