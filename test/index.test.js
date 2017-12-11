const index = require('../src/index');

it('should export all methods', () => {
  expect(Object.keys(index).sort()).toEqual([
    'concat',
    'concatLimit',
    'concatSeries',
    'map',
    'mapLimit',
    'mapSeries',
    'parallel',
    'parallelLimit',
    'series',
  ]);
});
