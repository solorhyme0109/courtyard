import React from 'react'

export default (Route) => (title, ...rest) => {
  document.title = title
  return <Route {...rest} />
}
