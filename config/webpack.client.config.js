const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestWebpackPlugin = require('webpack-manifest-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const buildPath = isProduction ? '../build' : '../dev';

module.exports = {
  entry: isProduction ? './src/index.jsx' : ['webpack-hot-middleware/client', './src/index.jsx'],
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'source-map',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/env'],
        },
        test: /\.(js|jsx)$/,
      },
      {
        test: /\.css$$/,
        use: isProduction ? [MiniCssExtractPlugin.loader, 'css-loader'] : ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              cacheDirectory: true,
              name: 'static/media/[name].[contenthash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      (compiler) => {
        if (isProduction) {
          new TerserPlugin({
            cache: true,
            sourceMap: false,
            extractComments: true,
            terserOptions: {
              compress: {
                comparisons: false,
                ecma: 5,
                inline: 2,
                warnings: false,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ascii_only: true,
                comments: false,
                ecma: 5,
              },
              parse: {
                ecma: 8,
              },
            },
            test: /\.js(\?.*)?$/,
          }).apply(compiler);

          new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
              map: {
                annotation: true,
                inline: false,
              },
            },
          }).apply(compiler);
        }
      },
    ],
    splitChunks: isProduction ? { chunks: 'all', maxInitialRequests: Infinity, minSize: 0 } : {},
  },
  output: {
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    filename: 'static/js/[name].[hash:8].js',
    publicPath: '/',
    path: path.resolve(__dirname, buildPath),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'public',
        ignore: ['index.html', 'favicon.ico', '**.js'],
        to: '',
      },
    ]),
    new HtmlWebpackPlugin({
      cache: true,
      favicon: './public/favicon.ico',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '/static/css/[name].[contenthash:8].chunkc.css',
      filename: 'static/css/[name].[contenthash:8].css',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
};

if (!isProduction) {
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (isProduction) {
  module.exports.plugins.push(
    new ManifestWebpackPlugin({
      fileName: 'asset-manifest.json',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      importWorkboxFrom: 'cdn',
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      cache: true,
      deleteOriginalAssets: true,
      minRatio: 0.8,
      test: /\.js$|\.css$/,
    }),
  );
}
