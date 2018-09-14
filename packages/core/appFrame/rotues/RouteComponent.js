import React from 'react'

import componentsManifest from '../componentsManifest'
import getRoutesBaseOnPages from './index'

export default class RouteComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    if (Array.isArray(props.pages)) {
      this.subPages = getRoutesBaseOnPages(props.pages)
    }
  }

  render () {
    const {components, pageId, style} = this.props
    const SubPages = this.subPages
    return (
      <div id={pageId} style={style}>
        {
          components.map((componentMeta) => {
            const Component = componentsManifest[componentMeta.resolve]
            return <Component key={componentMeta.resolve} {...componentMeta.props} />
          })
        }
        {
          SubPages && <SubPages />
        }
      </div>
    )
  }
}
