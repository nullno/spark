const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'test.js',
    path: path.resolve(__dirname, 'release')
  }
};
