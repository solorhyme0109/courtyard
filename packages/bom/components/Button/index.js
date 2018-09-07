import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CyTypes from 'core/types'

class Button extends Component {

  static propTypes = {
    desc: PropTypes.string.isRequired,
    effects: PropTypes.shape({
      alert: PropTypes.func.isRequired
    }),
    effectsParams: PropTypes.shape({
      alert: PropTypes.shape({
        message: PropTypes.string
      }),
      request: PropTypes.shape({
        url: PropTypes.string,
        body: PropTypes.shape({
          username: PropTypes.string
        })
      })
    })
  }

  static courtyard = {
    desc: CyTypes.string.isRequired,
    effects: CyTypes.shape({
      alert: CyTypes.func.isRequired
    }),
    effectsParams: CyTypes.shape({
      alert: CyTypes.shape({
        message: CyTypes.string.isRequired
      }),
      request: CyTypes.shape({
        url: CyTypes.string.isRequired,
        body: CyTypes.shape({
          username: CyTypes.string.isRequired,
          cards: CyTypes.arrayOf(CyTypes.shape({
            cardId: CyTypes.number.isRequired,
            cardName: CyTypes.string.isRequired
          })),
          isVip: CyTypes.bool,
          extra: CyTypes.any
        })
      })
    })
  }

  handleClick = (e) => {
    this.props.effects.alert()
    /** custom request */
    // myReqeust(this.props.effectsParams.request.url, this.props.request.body)
  }

  render() {
    return (
      <Button
        onClick={this.handleClick}
      >{this.props.desc}</Button>
    )
  }
}

export default Button;
