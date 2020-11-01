module.exports = {
  collectCoverage: true,
  coverageReporters: process.env.CI ? ["text-summary"] : ["lcov"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  preset: "ts-jest",
  testEnvironment: "node",
};
