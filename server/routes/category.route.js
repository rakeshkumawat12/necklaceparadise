import express from "express";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getAllCategories); // Fetch all categories

router.post("/", addCategory); // Add a new category

router.put("/:categoryId", updateCategory); // update a category 

router.delete("/:categoryId", deleteCategory); // delete category

export default router;
