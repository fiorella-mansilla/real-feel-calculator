import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the provided MONGO_URI.
 * @throws {Error} If there is an error connecting to the database.
 */
const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;