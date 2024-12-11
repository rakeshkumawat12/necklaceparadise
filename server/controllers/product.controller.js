import Product from "../models/product.model.js";

export const fetchAllProducts = async (req, res) => {
  try {
    const productDetails = await Product.find({});
    res.status(200).send(productDetails);
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

export const getProductsByFilter = async (req, res) => {
  try {
    const { category } = req.query;
    
    const filter = {};
    if (category) {
      filter.category = category;
    }

    const categoryProduct = await Product.find(filter);
    res.send(categoryProduct);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productDetails = await Product.findOne({
      _id: req.params.productId,
    }).populate("category");
    res.send(productDetails);
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const productDetails = await newProduct.save();

    res.send({
      success: true,
      ...productDetails,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updateProductDetails = await Product.updateOne(
      { _id: req.params.productId },
      { $set: req.body }
    );

    res.send(updateProductDetails);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.send({
      success: true,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};
