import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const orderDetails = await newOrder.save();

    res.send({
      success: true,
      ...orderDetails,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orderDetails = await Order.find({});
    res.status(200).send(orderDetails)
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const getOrdersById = async (req, res) => {
  try {
    
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const ordersDetails = await Order.findOne({ _id: req.params.orderId });
    res.send(ordersDetails);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {

    const updateOrderStatus = await Order.updateOne(
        {_id: req.params.orderId},
        {$set: req.body}
    )
    res.send(updateOrderStatus);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};
