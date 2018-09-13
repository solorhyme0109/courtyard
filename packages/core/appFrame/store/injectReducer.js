import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import store, { history } from './index'

const injectedReducers = {}

export default function injectReducer(key, reducer) {
  if (key in injectedReducers) {
    return
  }
  injectedReducers[key] = reducer
  store.replaceReducer(
    connectRouter(history)(
      combineReducers({...injectedReducers})
    )
  )
}
