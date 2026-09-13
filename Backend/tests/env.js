// Runs before each test file is loaded (Jest "setupFiles"), so these are in
// place before app.js's own dotenv.config() call — which never overwrites
// already-set vars, so this is what tests actually run against regardless
// of whether a local .env file exists.
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret";
process.env.FRONTEND_URL = "http://localhost:5173";
process.env.ADMIN_EMAIL = "admin@example.com";
process.env.EMAIL_FROM = "test@example.com";
