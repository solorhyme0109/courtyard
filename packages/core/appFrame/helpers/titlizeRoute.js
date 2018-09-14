import React from 'react'

export default (Route) => (title, ...rest) => {
  if (title) {
    document.title = title
  }
  return <Route {...rest} />
}
