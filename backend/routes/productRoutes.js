import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get("/", (req, res) => {
    Product.find({}, (err, products) => {
        res.json(products);
    });
});

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    });
});

export default router;
