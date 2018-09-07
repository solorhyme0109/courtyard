import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CyTypes from 'core/types'

/**
@connect(
  (state) => state[pageId],
  (dispatch) => ({
    mutation: bindActionCreators(mutations, dispatch)
  })
)
*/
class Input extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    mutation: PropTypes.shape({
      onChange: PropTypes.func
    })
  }

  static courtyard = {
    value: CyTypes.string.isRequired,
    mutation: CyTypes.shape({
      onChange: CyTypes.func.isRequired
    })
  }

  handleInputChange = (e) => {
    this.props.mutation.onChange(e.target.value)
  }

  render() {
    return (
      <div>
        <input
          value={this.props.value}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default Input;
