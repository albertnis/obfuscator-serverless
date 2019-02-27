const path = require("path"),
  HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    client: "./project/client/Client.js",
    bundle: "./project/client/Bundle.js"
  },
  output: {
    path: path.resolve(__dirname, "project/functions/server/assets"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use:
        {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./project/client/index.html",
      filename: "./index.html"
    })
  ]
}
