const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename:  './styles.css'
    })
  ]
};
