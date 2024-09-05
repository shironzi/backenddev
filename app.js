const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongodbStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://joshbaon1:zP4s0ysFjhhKf39v@cluster0.gve9m.mongodb.net/shop";

const app = express();
const store = new MongodbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = 

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  User.findById("66d96b9946d94633dee5c783")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Josh",
          email: "Joshbaon1@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log("Connected to MongoDB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
    console.error("Failed to connect to MongoDB:", err);
  });
