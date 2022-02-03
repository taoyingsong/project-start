const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      // {
      //     test: /\.tsx?$/,
      //     use: 'ts-loader',
      //     exclude: /node_modules/,
      // },
      {
        test: /\.(le|c)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // 直接在development环境写MiniCssExtractPlugin.loader不行。
          {
            // CSS 模块的命名导出， 被修改为以camelCase的形式
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                namedExport: true,
                localIdentName: 'foo__[name]__[local]',
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', 'jsx', '.js', '.json'],
  },
};
