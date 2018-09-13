import React from 'react'

import componentsManifest from '../componentsManifest'
import getRoutesBaseOnPages from './index'

export default class RouteComponent extends React.Component {
  constructor(props) {
    super(props)
    if (Array.isArray(props.pages)) {
      this.subPages = getRoutesBaseOnPages(props.pages)
    }
  }

  render () {
    const {components, pages} = this.props
    const SubPages = this.subPages
    return (
      <React.Fragment>
        {
          components.map((componentMeta) => {
            const Component = componentsManifest[componentMeta.resolve]
            return <Component {...componentMeta.props} />
          })
        }
        {
          SubPages && <SubPages />
        }
      </React.Fragment>
    )
  }
}
