const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';
  return {
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
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
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
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: '',
      filename: 'index_bundle.js',
      sourceMapFilename: 'index_bundle.js.map'
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
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }
};
