const getPackScript = (entryFilename, outputFilename) => `
const path = require('path');

module.exports = {
  entry: path.join(__dirname, '../${entryFilename}'),
  target: 'node',
  output: {
    path: path.resolve(__dirname),
    filename: '${outputFilename}',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
}`;

module.exports = {
  getPackScript,
};
