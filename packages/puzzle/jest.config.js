const baseConfig = require('../../config/jest/jest.base.config');

const packageName = require('./package.json').name;

module.exports = {
  ...baseConfig,
  rootDir: __dirname,
  name: packageName,
  displayName: packageName,
  coverageThreshold: {
    global: {branches: 100, functions: 94, lines: 93, statements: 92},
  },
  roots: ['<rootDir>'],
};
