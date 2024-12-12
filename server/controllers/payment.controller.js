import Stripe from "stripe";
import Payment from "../models/payment.model.js";
import env from "dotenv";
env.config();

const stripeKey = process.env.stripe_secret_key;
if (!stripeKey) {
  console.error("Stripe Secret Key is not defined!");
}

const stripe = new Stripe(
  stripeKey
);

export const getPaymentClientSecret = async (req, res) => {
  try {
    const paymentDetails = req.body;

    const productIds = paymentDetails.cartData.items.map(
      (item) => item.product._id
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentDetails.cartData.totalPrice,
      currency: "inr",
      payment_method_types: ["card"],
      metadata: {
        items: JSON.stringify(productIds), 
        price: paymentDetails.cartData.totalPrice,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const createPayment = async (req, res) => {
  try {
    const paymentDetails = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentDetails.transactionId
    );

    let orderItems = [];

    if (typeof paymentIntent.metadata.items === "string") {
      const itemsArray = JSON.parse(paymentIntent.metadata.items);

      orderItems = itemsArray.map((itemId) => ({
        product: itemId.trim(),
      }));
    } else {
      throw new Error("Unexpected format for paymentIntent.metadata.items");
    }

    const payment = new Payment({
      ...paymentDetails,
      totalPrice: paymentIntent.metadata.price,
      orderItems,
    });
    payment.user = req.user.id;
    await payment.save();

    res.send({
      success: true,
      message: "Payment is done!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const getPaymentDetail = async (req, res) => {
  try {
    const paymentDetail = await Payment.find({ user: req.user.id }).populate(
        "orderItems.product"
      )
      .populate("user")

    res.send(paymentDetail);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const getAllPaymentDetail = async (req, res) => {
  try {
    const paymentDetail = await Payment.find({}).populate(
        "orderItems.product"
      )
      .populate("user")

    res.send(paymentDetail);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};
