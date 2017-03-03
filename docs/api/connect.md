# devshareConnect

**Extends React.Component**

Higher Order Component that automatically listens/unListens
to provided devshare paths using React's Lifecycle hooks.

**Parameters**

-   `watchArray` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of objects or strings for paths to sync from Firebase

**Examples**

_Basic_

```javascript
// this.props.devshare set on App component as devshare object with helpers
import { devshareConnect } from 'react-redux-devshare'
export default devshareConnect()(App)
```

_Data_

```javascript
import { connect } from 'react-redux'
import { devshareConnect, dataToJS } from 'redux-devshare'

// sync /todos from devshare into redux
const fbWrapped = devshareConnect([
  'todos'
])(App)

// pass todos list from redux as this.props.todosList
export default connect(({ devshare }) => ({
  todosList: dataToJS(devshare, 'todos'),
  profile: pathToJS(devshare, 'profile'), // pass profile data as this.props.proifle
  auth: pathToJS(devshare, 'auth') // pass auth data as this.props.auth
}))(fbWrapped)
```

Returns **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** that accepts a component to wrap and returns the wrapped component
