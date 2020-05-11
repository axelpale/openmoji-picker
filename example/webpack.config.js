const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: 'ejs-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader?url=false']
      },
      {
        test: /\.(png|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ],
  },
  mode: 'production', // in {development, production}
  devtool: 'source-map'
}
