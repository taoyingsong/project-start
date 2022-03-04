const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const threadLoader = require('thread-loader')

const jsWorkerPool = {
  // options

  // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
  // 当 require('os').cpus() 是 undefined 时，则为 1
  // workers: 2,

  // 闲置时定时删除 worker 进程
  // 默认为 500ms
  // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
  poolTimeout: 2000,
}

const cssWorkerPool = {
  // 一个 worker 进程中并行执行工作的数量
  // 默认为 20
  workerParallelJobs: 2,
  poolTimeout: 2000,
}

threadLoader.warmup(jsWorkerPool, ['babel-loader'])
threadLoader.warmup(cssWorkerPool, ['css-loader', 'less-loader'])

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: devMode ? '[name].js' : '[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'thread-loader', options: jsWorkerPool },
          {
            loader: 'babel-loader?cacheDirectory=true',
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: [/\.module\.css$/i], // node_modules文件（其中的antd好像就没考虑支持css modules）、结尾没有.module的less文件，不开启css modules。这时全局生效
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // 直接在development环境写MiniCssExtractPlugin.loader不行。
          // { // 报错，组件的bug
          //   loader: 'thread-loader',
          //   options: cssWorkerPool,
          // },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/i,
        include: [/\.module\.css$/i], // 处理node_modules以外的样式文件
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
          'postcss-loader',
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
      'react/jsx-runtime': path.resolve(__dirname, '../node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(__dirname, '../node_modules/react/jsx-dev-runtime'),
      react: path.resolve(__dirname, '../node_modules/react/index.js'),
      '@src': path.resolve(__dirname, '../src'),
    },
  },
}
