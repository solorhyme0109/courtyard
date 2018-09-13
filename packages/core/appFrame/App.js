import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from './store'
import injectReducer from './store/injectReducer'
import appReducer from './store/appReducer'
import getRoutesBaseOnPages from './rotues'
import pages from './pagesData.json'

injectReducer('app', appReducer)

const AppRoutes = getRoutesBaseOnPages(pages)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <AppRoutes />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}
