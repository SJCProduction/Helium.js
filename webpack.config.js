const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules | build)/,
      },
    ],
  },
  externals: { React: 'commonjs react' },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
};
