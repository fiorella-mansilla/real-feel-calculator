import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

/* Server entry point */

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });