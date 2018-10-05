import {reduce} from 'lodash'

const Types = {
  string: getPrimitiveDesc('string'),
  bool: getPrimitiveDesc('bool'),
  number: getPrimitiveDesc('number'),
  func: getPrimitiveDesc('function'),
  any: getPrimitiveDesc('any'),
  shape: shapeDesc,
  arrayOf: arrayOfDesc
}

function getPrimitiveDesc(expectedType) {
  function returnType () {
    return {
      type: expectedType
    }
  }
  returnType.isRequired = function () {
    return Object.assign({}, returnType(), {
      isRequired: true
    })
  }
  return returnType
}

function shapeDesc(shape) {
  return function () {
    return reduce(shape, function (acc, cyType, key) {
      acc[key] = cyType()
      return acc
    }, {})
  }
}

function arrayOfDesc(cyType) {
  return function () {
    return {
      type: 'array',
      itemType: cyType()
    }
  }
}

export default Types
