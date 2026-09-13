import rateLimit from "express-rate-limit";

// Rate limiting itself isn't under test, and a shared window across a whole
// test file's requests would make unrelated assertions flaky — so it's
// disabled under NODE_ENV=test instead of tuning window/limit around it.
const skip = () => process.env.NODE_ENV === "test";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip,
  message: { message: "Too many requests, please try again later." },
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skip,
  message: { message: "Too many login attempts, please try again later." },
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skip,
  message: { message: "Too many password reset requests, please try again later." },
});
