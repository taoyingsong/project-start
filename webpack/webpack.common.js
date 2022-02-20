const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 暂时去掉缓存方便调试
              // // 在babel.config.js中配置
              // plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.(le|c)ss$/i,
        exclude: [/\.module\.less$/i], // node_modules文件（其中的antd好像就没考虑支持css modules）、结尾没有.module的less文件，不开启css modules。这时全局生效
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // 直接在development环境写MiniCssExtractPlugin.loader不行。
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(le|c)ss$/i,
        include: [/\.module\.less$/i], // 处理node_modules以外的样式文件
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // 直接在development环境写MiniCssExtractPlugin.loader不行。
          {
            // CSS 模块的命名导出， 被修改为以camelCase的形式
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: [/node_modules/],
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: [/node_modules/],
        type: 'asset/resource',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.tsx', '.ts', 'jsx', '.js', '.json'],
    alias: {
      // react: path.resolve(__dirname, './node_modules/react/index.js'),
      '@src': path.resolve(__dirname, '../src'),
      // mainFields: ['main'],
    },
  },
}
