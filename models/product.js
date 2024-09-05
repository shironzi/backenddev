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
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require("mongodb");
// const ObjectId = mongodb.ObjectId;

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
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log("Product successfully inserted:", result);
//         return result; // Return the result to the caller
//       })
//       .catch((err) => {
//         console.error("Error saving product:", err);
//         throw err;
//       });
//   }

//   static delete(prodId) {
//     const db = getDb();
//     return db.collection('products')
//       .deleteOne({ _id: new ObjectId(prodId) }) // Use the correct query to delete by _id
//       .then(result => {
//         console.log("Product successfully deleted:", result);
//         return result; // Return the result to the caller
//       })
//       .catch(err => {
//         console.error("Error deleting product:", err);
//         throw err; // Ensure to propagate the error
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find() // Filters products with the title "A Book"
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err; // Ensure to propagate the error for better error handling
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .findOne({ _id: new ObjectId(prodId) })
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }
// }

// module.exports = Product;
