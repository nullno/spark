const path = require('path');
const HWP = require('html-webpack-plugin');

const webpackConfig  = {
   // mode: 'production',
   entry: {
     // spark: './src/index.js',
     app: './src/html/index.js',
   },
   output: {
    filename: '[name].dev.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    library:"Spark",
    libraryTarget: 'umd',
    libraryExport: 'default'
   },
   devServer:{
   	 disableHostCheck: true,
     compress: true,
     port: 3000,
   },
   devtool: 'inline-source-map',
   plugins:[
    new HWP({
    	 title:'Spark开发环境',
    	 template:'./src/html/index.ejs',
    })
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