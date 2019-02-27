const path = require("path"),
  HtmlWebPackPlugin = require("html-webpack-plugin");

const frontend = {
  entry: {
    bundle: "./project/client/Bundle.js",
  },
  output: {
    path: path.resolve(__dirname, "project/client"),
    filename: "frontend-output.js"
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
};

const backend = {
  entry: {
    backend: "./project/functions/server/server.js"
  },
  output: {
    path: path.resolve(__dirname, "project/functions/server"),
    filename: "backend-output.js",
    libraryTarget: 'commonjs'
  },
  target: 'node',
  externals: [
    /^(?!\.|\/).+/i
  ],
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
        test: /\.node$/,
        exclude: /node_modules/,
        use:
        {
          loader: "node-loader"
        }
      }
    ]
  }
};

module.exports = [frontend, backend];