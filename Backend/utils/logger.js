import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      // Test output stays focused on assertions/failures, not app logs.
      silent: process.env.NODE_ENV === "test",
      format:
        process.env.NODE_ENV === "production"
          ? winston.format.json()
          : winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

export default logger;
