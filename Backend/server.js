import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import { initSocket } from "./socket.js";
import { scheduleWeeklyDigest } from "./jobs/weeklyDigest.js";
import contactRoutes from "./routes/contactRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import liveRoutes from "./routes/liveRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import sanitizeRequest from "./middleware/sanitize.js";
import { apiLimiter } from "./middleware/rateLimiters.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
initSocket(httpServer);


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
app.use("/api/v1/audit", auditRoutes);
app.use("/api/v1", exportRoutes);

// Swagger UI renders inline <script>/<style> tags, which helmet's default
// CSP (script-src/style-src 'self') blocks — drop the CSP header for just
// this route rather than weakening it globally.
app.use(
  "/api/docs",
  (req, res, next) => {
    res.removeHeader("Content-Security-Policy");
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");

    scheduleWeeklyDigest();

    httpServer.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
