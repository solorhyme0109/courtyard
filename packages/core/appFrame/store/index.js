import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from './rootReducer'
import appInitialState from './appInitialState'

export const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(rootReducer),
  appInitialState,
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      // ... other middlewares ...
    ),
  ),
)

export default store
