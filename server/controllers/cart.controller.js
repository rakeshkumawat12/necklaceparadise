import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCart = async (req, res) => {
  try {
    const cartDetails = await Cart.find({ user: req.user.id }).populate(
      "items.product"
    );
    res.status(200).send(cartDetails);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { items } = req.body;
    try {
      let cart = await Cart.findOne({ user: req.user.id });
      if (!cart) {
        cart = new Cart({ user: req.user.id, items });
      } else {
        items.forEach((item) => {
          if (!cart.items.some((i) => i.product.toString() === item.product)) {
            cart.items.push(item);
          }
        });
      }
      await cart.save();
      res.status(200).json(cart);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error adding product to cart", error: err });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    try {
      const cart = await Cart.findOne({ user: req.user.id });
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );
      await cart.save();
      res.status(200).json(cart);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error removing product from cart", error: err });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};
