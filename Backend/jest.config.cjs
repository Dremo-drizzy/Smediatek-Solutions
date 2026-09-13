module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/env.js"],
  testTimeout: 30000,
  // Each test file spins up its own real mongod via mongodb-memory-server;
  // running too many at once (Jest's default is one worker per CPU core)
  // starves them and causes intermittent startup failures, especially on
  // CI's more limited hardware.
  maxWorkers: 2,
  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**",
    "!**/tests/**",
    "!jest.config.cjs",
    "!babel.config.cjs",
    "!server.js",
    "!scripts/**",
  ],
  coverageDirectory: "coverage",
};
