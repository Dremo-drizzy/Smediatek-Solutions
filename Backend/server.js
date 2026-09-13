import http from "http";
import mongoose from "mongoose";
import app from "./app.js";
import { initSocket } from "./socket.js";
import { scheduleWeeklyDigest } from "./jobs/weeklyDigest.js";
import logger from "./utils/logger.js";

const httpServer = http.createServer(app);
initSocket(httpServer);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB connected successfully");

    scheduleWeeklyDigest();

    httpServer.listen(PORT, "0.0.0.0", () => {
      logger.info(`Server running on port ${PORT}`);
    });

  } catch (error) {
    logger.error("Failed to start server", { error: error.message });
    process.exit(1);
  }
};

startServer();
