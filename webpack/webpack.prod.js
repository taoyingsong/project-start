const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common');

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
      hash: true, // 缓存清除，引入的js路径后加了hash参数
      filename: '../dist/index.html',
      minify: {
        // 压缩HTML文件
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去除空格
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
});
