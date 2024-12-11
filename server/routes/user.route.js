import express from "express";
import { deleteUser, getUserDetail, login, registerUser, updateUser } from "../controllers/user.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser); // Register a new user

router.post("/login", login); // Log in a user

router.get("/",AuthMiddleware, getUserDetail); // Retrieve details of the logged in user

router.put("/",AuthMiddleware, updateUser)  // updateUser

router.delete("/",AuthMiddleware, deleteUser)  // deleteUser

export default router;