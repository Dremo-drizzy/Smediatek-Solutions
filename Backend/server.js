import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import contactRoutes from "./routes/contactRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import liveRoutes from "./routes/liveRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Yes" : "❌ No");

// Routes
app.get("/", (req, res) => res.send("SmediaTek Backend is running!"));
app.use("/api/contact", contactRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/livestream", liveRoutes);
app.use("/api/training", trainingRoutes);

// Bind server immediately
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Connect to MongoDB asynchronously
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};
connectDB();
