const fs = require('fs-extra')

module.exports = async (dist, data) => {
  await fs.writeFile(dist, data)
}