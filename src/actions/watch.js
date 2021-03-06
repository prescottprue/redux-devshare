import { SET, NO_VALUE } from '../constants'
import { filter, map, isString } from 'lodash'

const getWatchPath = (event, path) =>
  event + ':' + ((path.substring(0, 1) === '/') ? '' : '/') + path

/**
 * @description Set a new watcher
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
const setWatcher = (devshare, event, path, queryId = undefined) => {
  const id = (queryId) ? event + ':/' + queryId : getWatchPath(event, path)

  if (devshare._.watchers[id]) {
    devshare._.watchers[id]++
  } else {
    devshare._.watchers[id] = 1
  }

  return devshare._.watchers[id]
}

/**
 * @description Get count of currently attached watchers
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
const getWatcherCount = (devshare, event, path, queryId = undefined) => {
  const id = (queryId) ? event + ':/' + queryId : getWatchPath(event, path)
  return devshare._.watchers[id]
}

/**
 * @description Get query id from query path
 * @param {String} path - Path from which to get query id
 */
const getQueryIdFromPath = (path) => {
  const origPath = path
  let pathSplitted = path.split('#')
  path = pathSplitted[0]

  let isQuery = pathSplitted.length > 1
  let queryParams = isQuery ? pathSplitted[1].split('&') : []
  let queryId = isQuery ? queryParams.map((param) => {
    let splittedParam = param.split('=')
    if (splittedParam[0] === 'queryId') {
      return splittedParam[1]
    }
  }).filter(q => q) : undefined

  return (queryId && queryId.length > 0)
    ? queryId[0]
    : ((isQuery) ? origPath : undefined)
}

/**
 * @description Remove/Unset a watcher
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
const unsetWatcher = (devshare, event, path, queryId = undefined) => {
  let id = queryId || getQueryIdFromPath(path)
  path = path.split('#')[0]

  if (!id) {
    id = getWatchPath(event, path)
  }

  if (devshare._.watchers[id] <= 1) {
    delete devshare._.watchers[id]
    if (event !== 'first_child') {
      devshare.firebase.database().ref().child(path).off(event)
    }
  } else if (devshare._.watchers[id]) {
    devshare._.watchers[id]--
  }
}

/**
 * @description Watch a specific event type
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} dest
 * @param {Boolean} onlyLastEvent - Whether or not to listen to only the last event
 */
export const watchEvent = (devshare, dispatch, event, path, dest, onlyLastEvent = false) => {
  let isQuery = false
  let queryParams = []
  let queryId = getQueryIdFromPath(path)

  if (queryId) {
    let pathSplitted = path.split('#')
    path = pathSplitted[0]
    isQuery = true
    queryParams = pathSplitted[1].split('&')
  }

  const watchPath = (!dest) ? path : path + '@' + dest
  const counter = getWatcherCount(devshare, event, watchPath, queryId)

  if (counter > 0) {
    if (onlyLastEvent) {
      // listen only to last query on same path
      if (queryId) {
        unsetWatcher(devshare, event, path, queryId)
      } else {
        return
      }
    }
  }

  setWatcher(devshare, event, watchPath, queryId)

  if (event === 'first_child') {
    // return
    return devshare.firebase.database()
      .ref()
      .child(path)
      .orderByKey()
      .limitToFirst(1)
      .once('value', snapshot => {
        if (snapshot.val() === null) {
          dispatch({
            type: NO_VALUE,
            path
          })
        }
      })
  }

  let query = devshare.firebase.database().ref().child(path)

  if (isQuery) {
    let doNotParse = false

    queryParams.forEach((param) => {
      param = param.split('=')
      switch (param[0]) {
        case 'orderByValue':
          query = query.orderByValue()
          doNotParse = true
          break
        case 'orderByPriority':
          query = query.orderByPriority()
          doNotParse = true
          break
        case 'orderByKey':
          query = query.orderByKey()
          doNotParse = true
          break
        case 'orderByChild':
          query = query.orderByChild(param[1])
          break
        case 'limitToFirst':
          query = query.limitToFirst(parseInt(param[1], 10))
          break
        case 'limitToLast':
          query = query.limitToLast(parseInt(param[1], 10))
          break
        case 'equalTo':
          let equalToParam = !doNotParse ? parseInt(param[1], 10) || param[1] : param[1]
          equalToParam = equalToParam === 'null' ? null : equalToParam
          query = param.length === 3
            ? query.equalTo(equalToParam, param[2])
            : query.equalTo(equalToParam)
          break
        case 'startAt':
          let startAtParam = !doNotParse ? parseInt(param[1], 10) || param[1] : param[1]
          startAtParam = startAtParam === 'null' ? null : startAtParam
          query = param.length === 3
            ? query.startAt(startAtParam, param[2])
            : query.startAt(startAtParam)
          break
        case 'endAt':
          let endAtParam = !doNotParse ? parseInt(param[1], 10) || param[1] : param[1]
          endAtParam = endAtParam === 'null' ? null : endAtParam
          query = param.length === 3
            ? query.endAt(endAtParam, param[2])
            : query.endAt(endAtParam)
          break
        default:
          break
      }
    })
  }

  const runQuery = (q, e, p, params) => {
    q.on(e, snapshot => {
      let data = (e === 'child_removed') ? undefined : snapshot.val()
      const resultPath = dest || (e === 'value') ? p : p + '/' + snapshot.key

      if (dest && e !== 'child_removed') {
        data = {
          _id: snapshot.key,
          val: snapshot.val()
        }
      }

      const populates = filter(params, (param) => params.indexOf('populate'))
          .map(p => p.split('=')[1])
      // Dispatch standard if no populates
      if (!populates || !populates.length) {
        dispatch({
          type: SET,
          path: resultPath,
          data,
          snapshot
        })
      } else {
        //
        const populate = populates[0]
        const listToPopulate = snapshot.val()
        const paramToPopulate = populate.split(':')[0]
        const populateRoot = populate.split(':')[1]
        const listRef = devshare.firebase.database()
          .ref()
          .child(populateRoot)

        const promises = map(listToPopulate, item =>
          Promise.all(
            map(item[paramToPopulate], (objId) =>
            !isString(objId)
              ? Promise.reject(`Population id is not a string.\n Type: ${typeof objId}\n Id: ${JSON.stringify(objId)}`)
              : listRef.child(objId)
                .once('value')
                .then(snap => snap.val())
              )
            )
            .then((populatedList) => {
              const newItem = item
              newItem[paramToPopulate] = populatedList
              return newItem
            })
        )

        Promise.all(promises)
          .then((list) => {
            dispatch({
              type: SET,
              path: resultPath,
              data: list
            })
          })
      }
    })
  }

  runQuery(query, event, path, queryParams)
}

/**
 * @description Remove watcher from an event
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Event for which to remove the watcher
 * @param {String} path - Path of watcher to remove
 */
export const unWatchEvent = (devshare, event, path, queryId = undefined) =>
    unsetWatcher(devshare, event, path, queryId)

/**
 * @description Add watchers to a list of events
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {Array} events - List of events for which to add watchers
 */
export const watchEvents = (devshare, dispatch, events) =>
    events.forEach(event => watchEvent(devshare, dispatch, event.name, event.path))

/**
 * @description Remove watchers from a list of events
 * @param {Object} firebase - Internal firebase object
 * @param {Array} events - List of events for which to remove watchers
 */
export const unWatchEvents = (devshare, events) =>
    events.forEach(event => unWatchEvent(devshare, event.name, event.path))

export default { watchEvents, unWatchEvents }
