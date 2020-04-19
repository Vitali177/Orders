const path = require("path");

module.exports = {
  entry: ['babel-polyfill', './assets/js/app.js'],
  mode: 'development',
  output: {
    filename: './main.js',
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};