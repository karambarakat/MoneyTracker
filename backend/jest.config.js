/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  
  rootDir: '.',
  testPathIgnorePatterns: ['/build/', '/test/*.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // modify ts.config.json also
    '@lib/(.*)$': ['<rootDir>/src/lib/$1'],
    '@utils/(.*)$': ['<rootDir>/src/utils/$1'],
    '@middlewares/(.*)$': ['<rootDir>/src/middlewares/$1'],
    '@passport/(.*)$': ['<rootDir>/src/passport/$1'],
    '@controllers/(.*)$': ['<rootDir>/src/controllers/$1'],
    '@models/(.*)$': ['<rootDir>/src/models/$1'],
    '@httpErrors/(.*)$': ['<rootDir>/src/httpErrors/$1'],
    '@httpErrors': ['<rootDir>/src/httpErrors/index'],
    '@config/(.*)$': ['<rootDir>/src/config/$1'],
  },
}
