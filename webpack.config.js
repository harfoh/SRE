const path = require('path');

module.exports = {
  // Specify the mode (development or production)
  mode: 'development', // Change to 'production' for production builds

  // Entry point of the application
  entry: './src/app.js',

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
    publicPath: '/', // Public URL of the output directory when referenced in a browser
  },

  // Enable source maps for easier debugging
  devtool: 'source-map',

  // Resolve file extensions
  resolve: {
    extensions: ['.js', '.json'],
    fallback: {
      buffer: require.resolve('buffer/'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url/'),
      util: require.resolve('util/'),
    },
  },

  // Loaders configuration
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel for transpiling
          options: {
            presets: ['@babel/preset-env'], // Use the env preset
          },
        },
      },
    ],
  },

  // Development server configuration (optional)
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve files from the dist directory
    compress: true, // Enable gzip compression
    port: 3000, // Port for the server
    historyApiFallback: true, // Fallback to index.html for single-page applications
  },

  // Plugins configuration (optional, add if needed)
  plugins: [],
};
