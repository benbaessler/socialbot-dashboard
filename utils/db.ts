// /utils/db.js
import mongoose from "mongoose";
require("dotenv").config();

const connectDB = async () => {
  // Here is where we check if there is an active connection.
  if (mongoose.connections[0].readyState) return;

  try {
    // Here is where we create a new connection.
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to database.");
  } catch (error) {
    console.log("DB error", error);
  }
};

export default connectDB;
