const {flow, curryRight, reduce} = require('lodash')

function getCourtyard (theModule) {
  const Component = theModule.default || theModule
  return Component.courtyard
}

function handleEachProp (acc, value, key) {
  acc[key] = value()
  return acc
}

const getReduceShape = (acc) => curryRight(reduce)(acc)(handleEachProp)

module.exports = (acc) => flow([getCourtyard, getReduceShape(acc)])
