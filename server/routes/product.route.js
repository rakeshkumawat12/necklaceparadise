import express from "express";
import {
  addProduct,
  deleteProduct,
  fetchAllProducts,
  getProductById,
  getProductsByFilter,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// router.get("/", fetchAllProducts); //Fetch all products

router.get("/:productId", getProductById); // Fetch a specific product 

router.post("/", addProduct); // Add a new product

router.put("/:productId", updateProduct); // Update an existing product

router.delete("/:productId", deleteProduct); // Delete a product

router.get("/", getProductsByFilter) //Fetch all products by category

export default router;
