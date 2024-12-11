import express from "express";
import {
  addProductToCart,
  getCart,
  removeProductFromCart,
} from "../controllers/cart.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", AuthMiddleware, getCart); // Fetch the user's cart

router.post("/", AuthMiddleware, addProductToCart); // Add a product to the cart

router.post("/remove", AuthMiddleware, removeProductFromCart); // Remove a product from the cart

export default router;
