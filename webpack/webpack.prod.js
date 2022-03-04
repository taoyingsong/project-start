const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      // 对于 webpack@5，你可以使用 `...` 语法来扩展现有的minimizers (i.e. `terser-webpack-plugin`), 取消注释下一行
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      // hash: true, // 缓存清除，引入的js路径后加了hash参数。编译的时候都加hash了，不用再加了吧
      filename: '../dist/index.html',
      // minify: {
      //   // 压缩HTML文件
      //   removeComments: true, // 去除注释
      //   collapseWhitespace: true, // 去除空格
      // },
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new BundleAnalyzerPlugin(),
  ],
})
