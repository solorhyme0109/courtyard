const cp = require('child_process')
const config =  require('./config/runbuildConfig.json')

cp.spawnSync(`cd ${config.runbuildOutput} && npm link courtyard && npm run build 1>log.log 2>&1`)
