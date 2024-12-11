import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // orderItems: [
    //   {
    //     product: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "product",
    //       required: true,
    //     },
    //     price: { 
    //       type: Number, 
    //       required: true,
    //     },
    //   },
    // ],
    shippingAddress: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = new model("order", orderSchema);

export default Order;
