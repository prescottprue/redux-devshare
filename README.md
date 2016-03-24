# redux-devshare

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][climate-image]][climate-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

>redux-devshare is a redux connector for [devshare](https://github.com/KyperTech/devshare).

## Getting Started

### Install through NPM

1. Install: `npm install --save redux-devshare`

2. Include and use `redux-devshare` when creating redux middleware, when calling an action, or when combining reducers (examples in Documentation section below).

## Examples

*Simple example coming soon*

* [devshare-site](https://github.com/KyperTech/devshare-site)
* [generator-kyper-react](https://github.com/KyperTech/generator-kyper-react) - The output of this generator uses redux-devshare

## Documentation

### Middleware

```javascript
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers' // Combined reducers
import thunk from 'redux-thunk'
import { Middleware } from 'redux-devshare'

const createStoreWithMiddleware = compose(
  // Save for redux middleware
  applyMiddleware(thunk, Middleware)
)(createStore)
```

### Reducers

Add reducers to combineReducers function:

```javascript
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import { Reducers } from 'redux-devshare'
const { account, projects, entities } = Reducers

let rootReducer = combineReducers({
  account,
  projects,
  entities,
  router: routerStateReducer
})

export default rootReducer
```

### Actions

Example of using Actions from `redux-devshare` in a smart/linked component (also known as a "container"):

```javascript
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'redux-devshare'

class Main extends Component {
  constructor (props) {
    super(props)
  }
  onLoginClick = (e) => {
    e.preventDefault()
    const testLogin = {username: 'test', password: 'asdfasdf'}
    this.props.login(testLogin)
  }
  render() {
    return (
      <div className="App">
        <button onClick={ this.onLoginClick }>Login</button>
      </div>
    )
  }
}

// Place state of redux store into props of component
function mapStateToProps(state) {
  return {
    account: state.account
  }
}

// Place action methods into props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

```


[npm-image]: https://img.shields.io/npm/v/redux-devshare.svg?style=flat-square
[npm-url]: https://npmjs.org/package/redux-devshare
[npm-downloads-image]: https://img.shields.io/npm/dm/redux-devshare.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/KyperTech/redux-devshare/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/KyperTech/redux-devshare
[daviddm-image]: https://img.shields.io/david/KyperTech/redux-devshare.svg?style=flat-square
[daviddm-url]: https://david-dm.org/KyperTech/redux-devshare
[climate-image]: https://img.shields.io/codeclimate/github/KyperTech/redux-devshare.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/KyperTech/redux-devshare
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/KyperTech/redux-devshare.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/KyperTech/redux-devshare
[license-image]: https://img.shields.io/npm/l/redux-devshare.svg?style=flat-square
[license-url]: https://github.com/KyperTech/redux-devshare/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
