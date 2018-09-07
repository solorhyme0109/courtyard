import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CyTypes from 'core/types'

class Text extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired
  }

  static courtyard = {
    content: CyTypes.string.isRequired
  }

  render() {
    return (
      <div>
        {this.props.content}
      </div>
    );
  }
}

export default Text
