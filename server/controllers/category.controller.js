import Category from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
  try {
    const categoriesDetails = await Category.find({});
    res.status(200).send(categoriesDetails);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const categoryDetails = await newCategory.save();

    res.send({
      success: true,
      ...categoryDetails,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updateCategoryDetails = await Category.updateOne(
      { _id: req.params.categoryId },
      { $set: req.body }
    );

    res.send(updateCategoryDetails);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
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
