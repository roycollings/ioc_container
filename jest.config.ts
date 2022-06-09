module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  verbose: true,
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json"
    }
  },
};
