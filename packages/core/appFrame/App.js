import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from './store'
import injectReducer from './store/injectReducer'
import appReducer from './store/appReducer'

injectReducer('app', appReducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider
        store={store}
      >
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              {/* Routes... */}
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}
