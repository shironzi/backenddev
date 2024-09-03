const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log("Product successfully inserted:", result);
        return result; // Return the result to the caller
      })
      .catch((err) => {
        console.error("Error inserting product:", err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find() // Filters products with the title "A Book"
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
        throw err; // Ensure to propagate the error for better error handling
      });
  }
}

module.exports = Product;
