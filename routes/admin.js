const path = require("path");

const express = require("express");
const { check, body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// // /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// // /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title")
      .notEmpty()
      .trim()
      .isLength({ min: 5, max: 150 })
      .matches(/^[\w\s\-().,]+$/)
      .withMessage(
        "Title must only contain letters, numbers, and some special characters"
      ),
    body("imageUrl")
      .notEmpty()
      .trim()
      .isURL({ protocols: ["http", "https"], require_protocol: true }),

    body("price")
      .isCurrency({
        symbol: "₱",
        require_symbol: false,
        require_decimal: true,
        allow_negatives: false,
        thousands_separator: ",",
        decimal_separator: ".",
        allow_decimal: true,
        digits_after_decimal: [1],
      })
      .withMessage("Please enter a valid price in PHP format"),
    body("description")
      .notEmpty()
      .trim()
      .isLength({ min: 5, max: 500 })
      .matches(/^[\w\s\-().,]+$/)
      .withMessage("Description must be between 10 and 500 characters"),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title")
      .notEmpty()
      .trim()
      .isLength({ min: 5, max: 150 })
      .matches(/^[\w\s\-().,]+$/)
      .withMessage(
        "Title must only contain letters, numbers, and some special characters"
      ),
    body("imageUrl")
      .notEmpty()
      .trim()
      .isURL({ protocols: ["http", "https"], require_protocol: true }),
    body("price")
      .isCurrency({
        symbol: "₱",
        require_symbol: false,
        require_decimal: true,
        allow_negatives: false,
        thousands_separator: ",",
        decimal_separator: ".",
        allow_decimal: true,
        digits_after_decimal: [1],
      })
      .withMessage("Please enter a valid price in PHP format"),
    body("description")
      .notEmpty()
      .trim()
      .isLength({ min: 5, max: 500 })
      .matches(/^[\w\s\-().,]+$/)
      .withMessage("Description must be between 10 and 500 characters"),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
