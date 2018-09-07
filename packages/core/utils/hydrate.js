import {connect} from 'react-redux'
import Courtyard from 'courtyard'
import {map} from 'lodash'

/** 
 * 
 *  data
 *   
 *   pageId
*    {
      "id": "c:\\Users\\Zhangsw02\\Desktop\\webpaas\\componentsOutput\\Button\\index.js",
      "src": "c:\\Users\\Zhangsw02\\Desktop\\webpaas\\componentsOutput\\Button\\index.js",
      "component": "Button",
      "props": {
        "desc": "按钮"
      },
      "effects": {
        "alert": {
          "message": "submmiting"
        },
        "request": {
          "url": "api.domian.com/login",
          "body": {
            "username": "@store.username",
            "lvl": "@query.lvl",
            "userId": "@match.userId"
          }
        }
      }
    }
    component
 * 
*/

/** 
 * 
 * export default connect((state) => (...injectProps, ...state.pageId), (dispatch) => {
 *   return {
 *      effects: {
 *        alert: Courtyard.effects.alert
 *      },
 *      mutation: {
 *        onChange: Courtyard.mutation.onChange(@store.username)
 *      }
 *   }
 * })(Button)
*/

export default function hydrate(
  Component,
  config = {
    /** 
     * pageId: '/',
     * componentMeta
     * 
    */
  }
) {

  const propsFromMeta = config.componentMeta.props || {}
  const mutationMeta = config.componentMeta.mutation
  const effectsMeta = config.componentMeta.effects

  let mutation, effects, effectsParams

  if (mutationMeta) {
    mutation = (dispatch) => map(mutationMeta, (value, key) => (
      {
        [key]: Courtyard.mutation[key](dispatch)(value)
      })
    ).reduce((acc, value) => Object.assign(acc, value), {})
  }
  if (effectsMeta) {
    effects = map(effectsMeta, (value, key) => ({
      [key]: Courtyard.effects[key](value)
    })).reduce((acc, value) => Object.assign(acc, value), {})
    effectsParams = map(effectsMeta, (value, key) => ({
      [key]: value
    })).reduce((acc, value) => Object.assign(acc, value), {})
  }

  return connect(
    state => Object.assign({}, propsFromMeta, state[config.pageId]),
    (dispatch) => ({
      mutation: mutation ? mutation(dispatch) : undefined,
      effects,
      effectsParams
    })
  )(Component)
}
