const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", productSchema);
// const mongodb = require("mongodb");
// const { ObjectId } = require("mongodb");
// const getDB = require("../util/database").getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDB();
//     let dbOP;
//     if (this._id) {
//       // update the product
//       dbOP = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       console.log("adding:");
//       dbOP = db.collection("products").insertOne(this);
//     }
//     return dbOP
//       .then((result) => {
//         console.log("Insert result:", result);
//       })
//       .catch((err) => {
//         console.log("Insert err:", err);
//       });
//   }

//   static fetchAll() {
//     const db = getDB();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(" fetchAll products:", products);
//         return products;
//       })
//       .catch((err) => {
//         console.log("Insert err:", err);
//       });
//   }

//   static findById(id) {
//     const db = getDB();

//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(id) })
//       .next()
//       .then((result) => {
//         console.log("Find by Ud result:", result);
//         return result;
//       })
//       .catch((err) => console.log("While finding by ID", err));
//   }

//   static deleteById(id) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(id) })
//       .then((result) => {
//         console.log("Delete result:", result);
//         return result;
//       })
//       .catch((err) => {
//         console.log("Delete product err:", err);
//       });
//   }
// }

// // const Product = sequelize.define("product", {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   title: Sequelize.STRING,
// //   price: {
// //     type: Sequelize.DOUBLE,
// //     allowNull: false,
// //   },
// //   imageUrl: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// //   description: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// // });

// module.exports = Product;
