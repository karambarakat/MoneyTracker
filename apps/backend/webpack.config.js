// @ts-check
/* eslint-disable */
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: 'none',
  entry: './src/server.ts',
  node: {
    global: false,
    __dirname: true,
    __filename: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      }
    ]
  },
  target: 'node18',
  resolve: {
    plugins: [
      // @ts-ignore
      new TsconfigPathsPlugin({})
    ],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  }
}

module.exports = config