/* eslint-env node */
module.exports = {
  preset: 'ts-jest',
  exclude: ['utils', 'node_modules'],
  transform: {
    // transform js files with babel-jest
    '^.+\\.js?$': 'babel-jest',
    '\\.ts$': 'ts-jest',
  },
  // disable default jest transform for js files
  transformIgnorePatterns: [],
}
