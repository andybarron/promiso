const index = require('../src/index');

it('should export all methods', () => {
  expect(Object.keys(index).length).toBe(2);
});
