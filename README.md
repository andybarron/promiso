# Promiso

*Powerful promise utilities for any JS environment*

[![npm version](https://img.shields.io/npm/v/promiso.svg)](https://www.npmjs.com/package/promiso)
[![npm downloads](https://img.shields.io/npm/dt/promiso.svg)](https://www.npmjs.com/package/promiso)

## Installation
`npm i promiso`

## Requirements
* ES5-compatible environment
* ES6-compatible `Promise` defined globally (try
  [es6-promise polyfill][promise-polyfill])

## Use
```js
const promiso = require('promiso');

// You can also import individual methods.
const parallelLimit = require('promiso/lib/parallelLimit');
```

## Currently supported methods

**Actual docs coming soon :-)**

*See [caolan/async docs](https://caolan.github.io/async/docs.html), but an
"async function" in Promiso is a function that returns a promise (or any
`then`-able), rather than a function that accepts a callback. The methods
themselves do not accept callbacks, but they instead return promises that
resolve with the result.*

* [`parallel`](https://caolan.github.io/async/docs.html#parallel)
* [`parallelLimit`](https://caolan.github.io/async/docs.html#parallelLimit)

[promise-polyfill]: https://github.com/stefanpenner/es6-promise#auto-polyfill
