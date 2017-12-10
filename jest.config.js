module.exports = {
  verbose: true,
  transform: {
    '\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    '!src/types.ts',
  ],
  coverageThreshold: {
    lines: 90,
  },
  mapCoverage: true,
};
