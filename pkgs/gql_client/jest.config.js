/* eslint-env node */
module.exports = {
  preset: "ts-jest",
  transform: {
    // transform js files with babel-jest
    "^.+\\.js?$": "babel-jest",
    "\\.ts$": "ts-jest",
  },
  // disable default jest transform for js files
  transformIgnorePatterns: [],
};
