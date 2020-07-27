const path = require('path');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';
const buildPath = isProduction ? '../build' : '../dev';

module.exports = {
  entry: './server/src/server.ts',
  externals: [nodeExternals()],
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        use: 'ts-loader',
        test: /\.tsx?$/,
      },
    ],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, buildPath),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
};
