const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3000, // 默认8080
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: '../dist/index.html',
      inject: 'body', // 值默认为true，会根据scriptLoading判断怎么处理，scriptLoading选项默认为defer,现代浏览器支持非阻塞 javascript 加载（'defer'）以提高页面启动性能。
    }),
  ],
})
