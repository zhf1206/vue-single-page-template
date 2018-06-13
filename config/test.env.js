const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_SERVER:'http://europaapis.com'
})
// http://10.70.208.143:8093
