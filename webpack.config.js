
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
}; 

const common = {
    entry: {
        app: PATHS.app
    },
    resolve: {
      // resolve.extensions setting will allow you to refer to JSX files
      // without an extension
      extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: "json"
        },
        {
          test: /\.jsx?$/,
          // Enable caching for improved performance during development
          // It uses default OS directory by default. If you need something
          // more custom, pass a path to it. I.E., babel?cacheDirectory=<path>
          loaders: ['babel?cacheDirectory'],
          include: PATHS.app
        },
        {
          test: /\.css$/,
          // A similar approach works with CSS preprocessors, like Sass and Less
          // and their loaders.
          loaders: ['style', 'css'],
          include: PATHS.app
        }
      ]
    }
};

// Default configuration
if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
      devtool: 'eval-source-map',
      devServer: {
        contentBase: PATHS.build,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        // Display only errors to reduce the amount of output
        stats: 'errors-only',
        host: process.env.HOTS,
        port: process.env.PORT
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new NpmInstallPlugin({
          save: true // --save
        })
      ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
      plugins: [
        // Setting DefinePlugin affects React library size!
        // DefinePlugin replaces context "as is" so we need some extra quotes
        // for the generated code to make sense.
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ]
    });
}
