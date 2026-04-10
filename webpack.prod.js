const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const Package = require("./package.json");

const webpackConfig = {
  mode: "production",
  entry: {
    spark: "./src/index.js",
  },
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "release/"),
    library: "Spark",
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this",
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: true,
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: { ecma: 5 },
          compress: {
            ecma: 5,
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_getters: true,
            passes: 3,
            collapse_vars: true,
            reduce_vars: true,
            dead_code: true,
            unused: true,
            conditionals: true,
            if_return: true,
            join_vars: true,
            sequences: true,
            booleans: true,
            loops: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: "babel-loader",
      },
    ],
  },

  stats: {
    version: true,
  },
};

module.exports = webpackConfig;
