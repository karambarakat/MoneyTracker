/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // setupFiles: ['dotenv/config'],
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  rootDir: './src/',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // modify ts.config.json also
    '@lib/(.*)$': ['<rootDir>/lib/$1'],
    '@utils/(.*)$': ['<rootDir>/utils/$1'],
    '@middlewares/(.*)$': ['<rootDir>/middlewares/$1'],
    '@passport/(.*)$': ['<rootDir>/passport/$1'],
    '@controllers/(.*)$': ['<rootDir>/controllers/$1'],
    '@models/(.*)$': ['<rootDir>/models/$1'],
    '@httpErrors/(.*)$': ['<rootDir>/httpErrors/$1'],
    '@httpErrors': ['<rootDir>/httpErrors/index'],
    '@config/(.*)$': ['<rootDir>/config/$1'],
  },
}
