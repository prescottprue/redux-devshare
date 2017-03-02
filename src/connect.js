import React, { PropTypes, Component } from 'react'
import { isEqual } from 'lodash'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, createCallable } from './utils'

/**
 * @name devshareConnect
 * @extends React.Component
 * @description Higher Order Component that automatically listens/unListens
 * to provided devshare paths using React's Lifecycle hooks.
 * @param {Array} watchArray - Array of objects or strings for paths to sync from Firebase
 * @return {Function} - that accepts a component to wrap and returns the wrapped component
 * @example <caption>Basic</caption>
 * // this.props.devshare set on App component as devshare object with helpers
 * import { devshareConnect } from 'react-redux-devshare'
 * export default devshareConnect()(App)
 * @example <caption>Data</caption>
 * import { connect } from 'react-redux'
 * import { devshareConnect, dataToJS } from 'redux-devshare'
 *
 * // sync /todos from devshare into redux
 * const fbWrapped = devshareConnect([
 *   'todos'
 * ])(App)
 *
 * // pass todos list from redux as this.props.todosList
 * export default connect(({ devshare }) => ({
 *   todosList: dataToJS(devshare, 'todos'),
 *   profile: pathToJS(devshare, 'profile'), // pass profile data as this.props.proifle
 *   auth: pathToJS(devshare, 'auth') // pass auth data as this.props.auth
 * }))(fbWrapped)
 */
export default (dataOrFn = []) => WrappedComponent => {
  class DevshareConnect extends Component {

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

      // Allow function to be passed
      const inputAsFunc = createCallable(dataOrFn)
      this.prevData = inputAsFunc(this.props, devshare)

      const { ref, helpers, storage, database, auth } = devshare
      this.devshare = { ref, storage, database, auth, ...helpers }

      this._devshareEvents = getEventsFromInput(this.prevData)

      watchEvents(devshare, dispatch, this._devshareEvents)
    }

    componentWillUnmount () {
      const { devshare, dispatch } = this.context.store
      unWatchEvents(devshare, dispatch, this._devshareEvents)
    }

    componentWillReceiveProps (np) {
      const { devshare, dispatch } = this.context.store
      const inputAsFunc = createCallable(dataOrFn)
      const data = inputAsFunc(np, devshare)

      // Handle a data parameter having changed
      if (!isEqual(data, this.prevData)) {
        this.prevData = data
        // UnWatch all current events
        unWatchEvents(devshare, dispatch, this._devshareEvents)
        // Get watch events from new data
        this._devshareEvents = getEventsFromInput(data)
        // Watch new events
        watchEvents(devshare, dispatch, this._devshareEvents)
      }
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

  return DevshareConnect
}
