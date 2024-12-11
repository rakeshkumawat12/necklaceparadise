import express from "express";
import {
  createPayment,
  getAllPaymentDetail,
  getPaymentClientSecret,
  getPaymentDetail,
} from "../controllers/payment.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/get-payment-secret", AuthMiddleware, getPaymentClientSecret);

// Create Booking
router.post("/confirm", AuthMiddleware, createPayment);

// Get Booking details
router.get("/", AuthMiddleware, getPaymentDetail);

router.get("/allDetails", AuthMiddleware, getAllPaymentDetail);

export default router;
