import mongoose, { model, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number, // Store the total price as a number
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = new model("payment", paymentSchema);

export default Payment;
