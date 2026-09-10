import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import contactRoutes from "./routes/contactRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import liveRoutes from "./routes/liveRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import sanitizeRequest from "./middleware/sanitize.js";
import { apiLimiter } from "./middleware/rateLimiters.js";

dotenv.config();

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(sanitizeRequest);
app.use("/api", apiLimiter);


app.get("/", (req, res) => {
  res.send("SmediaTek Backend is running!");
});


app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/livestream", liveRoutes);
app.use("/api/training", trainingRoutes);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
