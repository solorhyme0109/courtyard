const path = require('path')

module.exports = function () {
  // mock data for test
  return require(path.join(__dirname, '../../../', 'mocks/app.json'))
}