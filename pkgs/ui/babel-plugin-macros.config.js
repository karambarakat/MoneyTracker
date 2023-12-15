/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require('path')
module.exports = {
  twin: {
    preset: 'emotion',
    config: path.resolve(__dirname, 'tailwind.config.cjs'),
  },
}
