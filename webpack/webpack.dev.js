const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()
const common = require('./webpack.common')

module.exports = smp.wrap(
  merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      port: 3000, // 默认8080
      historyApiFallback: true,
      // contentBase: './',
      // static: './dist',
      hot: true,
    },
    plugins: [
      new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        // hash: true, // 缓存清除，引入的js路径后加了hash参数。编译的时候都加hash了，不用再加了吧
        filename: '../dist/index.html',
        inject: 'body', // 值默认为true，会根据scriptLoading判断怎么处理，scriptLoading选项默认为defer,现代浏览器支持非阻塞 javascript 加载（'defer'）以提高页面启动性能。
      }),
    ],
  })
)
