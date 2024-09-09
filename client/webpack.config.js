const webpack = require("webpack");

module.exports = {
  // Other configurations...

  resolve: {
    fallback: {
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      buffer: require.resolve("buffer/"),
      url: require.resolve("url/"),
      util: require.resolve("util/"),
      fs: false, // `fs` is a Node.js module and is not available in the browser
      net: false, // `net` is a Node.js module and is not available in the browser
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
