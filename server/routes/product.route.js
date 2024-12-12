import express from "express";
import {
  addProduct,
  deleteProduct,
  fetchAllProducts,
  getProductById,
  getProductsByFilter,
  updateProduct,
} from "../controllers/product.controller.js";
import isAdminMiddleware from "../middleware/isAdmin.middleware.js"

const router = express.Router();

// router.get("/", fetchAllProducts); //Fetch all products

router.get("/:productId", getProductById); // Fetch a specific product 

router.post("/",isAdminMiddleware, addProduct); // Add a new product

router.put("/:productId", isAdminMiddleware, updateProduct); // Update an existing product

router.delete("/:productId",isAdminMiddleware, deleteProduct); // Delete a product

router.get("/", getProductsByFilter) //Fetch all products by category

export default router;
