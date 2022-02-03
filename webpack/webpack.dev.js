const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3000, // 默认8080
    static: './dist',
    hot: true,
  },
  plugins: [
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true, // 缓存清除，引入的js路径后加了hash参数
      filename: '../dist/index.html',
    }),
  ],
});
