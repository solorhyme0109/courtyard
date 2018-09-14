export default {
  mutation: {
    onChange: (dispatch) => (value) => {
      console.log('mutation onChange', value)
    }
  },
  effects: {
    alert: (...args) => {console.log()},
    request: (...args) => {console.log()}
  }
}