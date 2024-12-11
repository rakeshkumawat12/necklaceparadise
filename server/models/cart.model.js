import mongoose, { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        }
      }
    ],
  },
  { timestamps: true }
);

const Cart = new model("cart", cartSchema);

export default Cart;
