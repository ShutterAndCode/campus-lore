import mongoose from "mongoose";
import env from "./env.js";

/**
 * Connects to MongoDB using Mongoose.
 * Exits the process on failure since the server cannot
 * function meaningfully without a database connection.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log(`[db] MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("[db] MongoDB connection failed:", error);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("[db] MongoDB disconnected");
});

export default connectDB;
