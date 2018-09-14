import React from 'react'
import { Switch, Route as ReactRouterRoute } from 'react-router'
import titlizeRoute from '../helpers/titlizeRoute'
import RouteComponent from './RouteComponent'

const Route = titlizeRoute(ReactRouterRoute)

export default (pages) => class Routes extends React.Component {
  render() {
    return (
      <Switch>
        {
          pages.map((page) => 
            <Route
              key={page.pageId}
              title={page.title}
              path={page.route}
              exact={page['exact']}
              render={(props) => <RouteComponent {...props} components={page.components} pageId={page.pageId} pages={page.pages} />}
            />)
        }
      </Switch>
    )
  }
}
