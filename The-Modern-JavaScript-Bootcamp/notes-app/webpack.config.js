const path = require("path");

module.exports = {
  entry: {
    index: ["babel-polyfill", "./src/index.js"],
    edit: ["babel-polyfill", "./src/edit.js"],
  },
  output: {
    path: path.resolve(__dirname, "public/scripts"),
    filename: "[name]-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 8080,
    devMiddleware: {
      publicPath: "https://localhost:8080/scripts/",
    },
  },
  devtool: "source-map",
  mode: "development",
};
