# API Reference

Just like [redux](http://redux.js.org/docs/api/index.html), the redux-devshare API surface is small.

## Top-Level Exports
* [devshareConnect](/docs/api/connect.md)
* [firebaseStateReducer](/docs/api/reducer.md)
* [reactReduxFirebase](/docs/api/compose.md)
* [constants](/docs/api/constants.md)
* [actionTypes](/docs/api/constants.md)
* [helpers](/docs/api/helpers.md)

## Importing

Every function described above is a top-level export. You can import any of them like this:

### ES6
```js
import { devshareConnect } from 'redux-devshare'
```

### ES5 (CommonJS)
```js
var devshareConnect = require('redux-devshare').devshareConnect
```
