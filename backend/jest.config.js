export default {
  testEnvironment: "node",

  transform: {},

  testMatch: ["<rootDir>/src/tests/**/*.test.js"],

  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setup/testSetup.js",
  ],

  testTimeout: 15000,
};