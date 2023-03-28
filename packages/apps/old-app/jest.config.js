const nextJest = require("next/jest");

const createJestConfig = nextJest({
  rootDir: "./src",
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/?(*.)spec.ts?(x)"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testEnvironment: "jest-environment-jsdom",
};
module.exports = createJestConfig(customJestConfig);