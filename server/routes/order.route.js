import express from "express";
import { createOrder, getAllOrders, getById, getOrdersById, updateStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);  // Create a new order

router.get("/", getAllOrders);  //Fetch all orders (Admin only)

router.get("/user/:userId", getOrdersById);  // Fetch order for a specific user id

router.get("/:orderId", getById); // Fetch a specific order by id  

router.put("/:orderId", updateStatus); // update the status of an order (Admin only)  

export default router;
