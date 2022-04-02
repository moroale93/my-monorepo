const baseConfig = require('../../config/jest/jest.base.config');

const packageName = require('./package.json').name;

module.exports = {
  ...baseConfig,
  rootDir: __dirname,
  name: packageName,
  displayName: packageName,
  coverageThreshold: {
    global: {branches: 9, functions: 31, lines: 37, statements: 39},
  },
  roots: ['<rootDir>'],
};

