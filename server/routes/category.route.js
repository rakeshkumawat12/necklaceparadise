import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import isAdminMiddleware from "../middleware/isAdmin.middleware.js";

const router = express.Router();

router.get("/", getAllCategories); // Fetch all categories

router.post("/", isAdminMiddleware, addCategory); // Add a new category

router.put("/:categoryId", isAdminMiddleware, updateCategory); // update a category

router.delete("/:categoryId", isAdminMiddleware, deleteCategory); // delete category

export default router;
