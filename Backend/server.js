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
import statsRoutes from "./routes/statsRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import sanitizeRequest from "./middleware/sanitize.js";
import { apiLimiter } from "./middleware/rateLimiters.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();


app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(sanitizeRequest);
app.use("/api/v1", apiLimiter);


app.get("/", (req, res) => {
  res.send("SmediaTek Backend is running!");
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/livestream", liveRoutes);
app.use("/api/v1/training", trainingRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/portfolio", portfolioRoutes);

app.use(errorHandler);


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
