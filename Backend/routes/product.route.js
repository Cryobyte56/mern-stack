import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

// Display Products
router.get("/", getProducts);

// Create Products
router.post("/", createProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

export default router;
