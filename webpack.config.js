const path = require("path")

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
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
}
