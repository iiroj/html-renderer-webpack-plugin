module.exports = {
  collectCoverage: true,
  coverageReporters: process.env.CI ? ["text-summary"] : ["lcov"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
  preset: "ts-jest",
  testEnvironment: "node",
};
