const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize
  .sync({ alter: true })
  .then((result) => {
    console.log("Product table is ready or created if it did not exist");
  })
  .catch((err) => {
    console.error("Error syncing the Product model with the database:", err);
  });

module.exports = Product;
