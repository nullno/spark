const path = require('path');

const { CleanWebpackPlugin  } = require('clean-webpack-plugin');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin')

const webpackConfig  = {
   mode: 'production',
   entry: {
     spark: './src/index.js',
   },
   output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'release/version@1.1'),
    globalObject: 'this',
    library:"Spark",
    libraryTarget: 'umd',
    libraryExport: 'default'
   },
   plugins:[
    new UglifyJsPlugin(),
    new CleanWebpackPlugin(),
   ],
   module: {
        rules: [
        {
        	test:/\.(js|jsx)$/,
        	use: 'babel-loader',
        }
        ],
    },

};


module.exports = webpackConfig;