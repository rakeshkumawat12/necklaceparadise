import Stripe from "stripe";
import Payment from "../models/payment.model.js";
const stripe = new Stripe(
  "sk_test_51NOFUdSDhay8j6t62R19k9007TVcB9t3vPVr5qMaefXBS2e8qqPtKZFzMX2LAOdHGbzPkj3tRW4mxQsVv7Qetedo00NGTrfabY"
);

export const getPaymentClientSecret = async (req, res) => {
  try {
    const paymentDetails = req.body;
    // console.log(paymentDetails.cartData.items);

    const productIds = paymentDetails.cartData.items.map(
      (item) => item.product._id
    );
    // console.log(productIds); //[ '6751730c333d2b680bd11dc5', '675177e7333d2b680bd11de3' ]

    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentDetails.cartData.totalPrice,
      currency: "inr",
      payment_method_types: ["card"],
      //   metadata: {
      // items: JSON.stringify(paymentDetails.cartData.items),
      // price: paymentDetails.cartData.totalPrice,
      //   },
      metadata: {
        items: JSON.stringify(productIds), // Add product IDs as metadata
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
    // console.log("2", paymentIntent.metadata.items); //2 ["6751730c333d2b680bd11dc5","675177e7333d2b680bd11de3"]
    // console.log("3", paymentIntent.metadata.price); //3 144185

    // console.log("Type of items:", typeof paymentIntent.metadata.items);
    // console.log("Items:", paymentIntent.metadata.items);

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
