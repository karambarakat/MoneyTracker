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
  // rootDir: './src/',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // modify ts.config.json also
    '@lib/(.*)$': ['<rootDir>/src/lib/$1'],
    '@utils/(.*)$': ['<rootDir>/src/utils/$1'],
    '@middlewares/(.*)$': ['<rootDir>/src/middlewares/$1'],
    '@controllers/(.*)$': ['<rootDir>/src/controllers/$1'],
    '@models/(.*)$': ['<rootDir>/src/models/$1'],
    '@httpErrors/(.*)$': ['<rootDir>/src/httpErrors/$1'],
    '@httpErrors': ['<rootDir>/src/httpErrors/index'],
    '@interfaces/(.*)$': ['<rootDir>/src/interfaces/$1'],
    '@config/(.*)$': ['<rootDir>/src/config/$1'],
  },
}
