import User from "../model/user_model.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const createduser = new User({
      fullname,
      email,
      password: hashpassword,
    });

    await createduser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createduser._id,
        fullname: createduser.fullname,
        email: createduser.email,
      },
    });
  } catch (error) {
    console.log("error" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // If login is successful
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
