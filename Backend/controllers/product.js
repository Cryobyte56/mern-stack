import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Display Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error Fetchinig Products: ", error.message); //For Debugging
    res.status(500).json({ success: false, message: "Server-Side Error" });
  }
};

// Create Product
export const createProduct = async (req, res) => {
  const product = req.body; //User will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "All Fields are Required" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Creating the Product: ", error.message);
    res.status(500).json({ success: false, message: "Server-Side error" });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  //If not a Valid ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(201).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in Updating the Product: ", error.message);
    res.status(500).json({ success: false, message: "Server-Side error" });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  //If not a Valid ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log("Error Deleting Product: ", error.message);
    res.status(500).json({ success: false, message: "Server-Side Error" });
  }
};
