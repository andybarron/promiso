# Promiso

*Powerful promise utilities for any JS environment - because who uses callbacks in 2018?*

[![NPM version](https://img.shields.io/npm/v/promiso.svg)](https://www.npmjs.com/package/promiso)
[![NPM downloads](https://img.shields.io/npm/dt/promiso.svg)](https://www.npmjs.com/package/promiso)
[![Build status][build-badge]][build-link]
[![Coverage status][coverage-badge]][coverage-link]

## Installation
`npm i promiso`

## Requirements
* ES5-compatible environment
* ES6-compatible `Promise` defined globally (try
  [es6-promise polyfill][promise-polyfill])

## Usage

### Standard promises
```js
const promiso = require('promiso');

// Double a number after 1 second.
const slowDouble = (number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(number * 2), 1000);
  });
};

const numbers = [1, 2, 3, 4];

promiso.mapLimit(numbers, 2, slowDouble)
  .then((doubled) => {
    // 4 items limited to 2 concurrent executions, so this should fire after about 2 seconds.
    console.log(doubled); // [2, 4, 6, 8]
  });
```

### `async`/`await`
```js
const promiso = require('promiso');

// Helper function for async/await.
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// Triple a number after 1 second.
const slowTriple = async (number) => {
  await sleep(1000);
  return number * 3;
};

const numbers = [1, 2, 3, 4, 5, 6];

const main = async () => {
  const tripled = await promiso.mapLimit(numbers, 3, slowTriple);
  // 6 items limited to 3 concurrent executions, so this should complete after about 2 seconds.
  console.log(tripled); // [3, 6, 9, 12, 15, 18]
};

main();
```

### Individual functions
You can also import individual functions for smaller bundles.
```js
const parallelLimit = require('promiso/lib/parallelLimit');
```

## API

**Actual docs coming soon :-)**

See [the documentation][async-lib-docs] for the [original async library][async-lib-repo], but
Promiso offers these improvements:

* An "async function" in Promiso is any function that always returns a promise. This includes
  [ES2017's true async functions][async-function] - *even if they have been transpiled!*
* Whenever Promiso expect an async function, you can instead use a synchronous function and obtain
  the same result without any errors. (However, normal guarantees about concurrent executions may
  not apply.)
* Promiso library functions do not accept callbacks. They instead return promises that resolve or
  reject accordingly.

The following functions are available (with support planned for every function available in
[async][async-lib-repo]):

* [`concat`](https://caolan.github.io/async/docs.html#concat)
* [`concatLimit`](https://caolan.github.io/async/docs.html#concatLimit)
* [`concatSeries`](https://caolan.github.io/async/docs.html#concatSeries)
* [`map`](https://caolan.github.io/async/docs.html#map)
* [`mapLimit`](https://caolan.github.io/async/docs.html#mapLimit)
* [`mapSeries`](https://caolan.github.io/async/docs.html#mapSeries)
* [`parallel`](https://caolan.github.io/async/docs.html#parallel)
* [`parallelLimit`](https://caolan.github.io/async/docs.html#parallelLimit)
* [`series`](https://caolan.github.io/async/docs.html#series)

[build-badge]: https://travis-ci.org/AndyBarron/promiso.svg?branch=master
[build-link]: https://travis-ci.org/AndyBarron/promiso
[coverage-badge]: https://coveralls.io/repos/github/AndyBarron/promiso/badge.svg?branch=master
[coverage-link]: https://coveralls.io/github/AndyBarron/promiso?branch=master
[promise-polyfill]: https://github.com/stefanpenner/es6-promise#auto-polyfill
[async-function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[async-lib-docs]: https://caolan.github.io/async/docs.html
[async-lib-repo]: https://github.com/caolan/async
