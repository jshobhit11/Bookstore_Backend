// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import bookRoute from "./routes/book_route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGO_DB_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

// Connect to MongoDB
connectToDatabase();

//defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
