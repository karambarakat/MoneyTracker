/* eslint-env node */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  rootDir: '.',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // modify ts.config.json also
    '@config/(.*)$': ['<rootDir>/src/config/$1'],
    '@controllers/(.*)$': ['<rootDir>/src/controllers/$1'],
    '@middlewares/(.*)$': ['<rootDir>/src/middlewares/$1'],
    '@models/(.*)$': ['<rootDir>/src/models/$1'],
    '@utils/(.*)$': ['<rootDir>/src/utils/$1'],
    '@static/(.*)$': ['<rootDir>/src/static/$1']
  }
}
