import React, { PropTypes, Component } from 'react'
import { watchEvents, unWatchEvents } from './actions/watch'

const defaultEvent = {
  path: '',
  type: 'value'
}

const ensureCallable = maybeFn => //eslint-disable-line
  typeof maybeFn === 'function' ? maybeFn : () => maybeFn //eslint-disable-line

const flatMap = arr => (arr && arr.length) ? arr.reduce((a, b) => a.concat(b)) : []

const createEvents = ({type, path}) => {
  switch (type) {

    case 'value':
      return [{name: 'value', path}]

    case 'all':
      return [
        {name: 'first_child', path},
        {name: 'child_added', path},
        {name: 'child_removed', path},
        {name: 'child_moved', path},
        {name: 'child_changed', path}
      ]

    default:
      return []
  }
}

const transformEvent = event => Object.assign({}, defaultEvent, event)

const getEventsFromDefinition = def => flatMap(def.map(path => {
  if (typeof path === 'string' || path instanceof String) {
    return createEvents(transformEvent({ path }))
  }

  if (typeof path === 'array' || path instanceof Array) { // eslint-disable-line
    return createEvents(transformEvent({ type: 'all', path: path[0] }))
  }

  if (typeof path === 'object' || path instanceof Object) {
    const type = path.type || 'value'
    switch (type) {
      case 'value':
        return createEvents(transformEvent({ path: path.path }))

      case 'array':
        return createEvents(transformEvent({ type: 'all', path: path.path }))
    }
  }

  return []
}))

export default (dataOrFn = []) => WrappedComponent => {
  class FirebaseConnect extends Component {

    constructor (props, context) {
      super(props, context)
      this._devshareEvents = []
      this.devshare = null
    }

    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    componentWillMount () {
      const { devshare, dispatch } = this.context.store

      const linkFn = ensureCallable(dataOrFn)
      const data = linkFn(this.props, devshare)

      const { helpers, firebase, ref, projects, project, users, user } = devshare
      this.devshare = { ref, firebase, projects, project, users, user, ...helpers }

      this._devshareEvents = getEventsFromDefinition(data)
      watchEvents(devshare, dispatch, this._devshareEvents)
    }

    componentWillUnmount () {
      const {devshare} = this.context.store
      unWatchEvents(devshare, this._devshareEvents)
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          devshare={this.devshare}
        />
      )
    }
  }

  return FirebaseConnect
}
