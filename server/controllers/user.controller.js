import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const userData = req.body;

    const newUser = await User.create(userData);
    res.status(200).send(newUser);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const login = async (req, res) => {
  const userDetail = req.body;
  const user = await User.findOne({ email: userDetail.email }).select(
    "password email isAdmin"
  );

  if (user) {
    const validPassword = await bcrypt.compare(
      userDetail.password,
      user.password
    );

    if (validPassword) {
      const jwtToken = jwt.sign(
        {
          email: user.email,
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.jwt_secret_salt,
        { expiresIn: "1d" }
      );

      return res.status(200).send({
        status: true,
        user: user.email,
        isAdmin: user.isAdmin,
        message: "You are logged in",
        jwtToken,
      });
    } else {
      return res.status(401).send({
        status: false,
        message: "Email or Password is incorrect",
      });
    }
  } else {
    return res.status(401).send({
      status: false,
      message: "Email or Password is incorrect",
    });
  }
};

export const getUserDetail = async (req, res) => {
  try {
    const userInfo = await User.findOne({ email: req.user.email });
    if (!userInfo) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      status: true,
      ...userInfo._doc,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userData = req.body;
    const userId = req.user.id;

    if (!userData) {
      return res.status(400).json({ error: "No data provided to update." });
    }

    const updatedData = await User.updateOne(
      { _id: userId },
      { $set: userData }
    );
    res
      .status(200)
      .json({ message: "User updated successfully.", data: updatedData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.user.id;
  const deletedData = await User.findByIdAndDelete(userId);
  res.status(200).send(deletedData);
};
