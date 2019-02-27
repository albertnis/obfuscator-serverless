const path = require("path");

const frontend = {
  entry: {
    frontend: "./src/frontend/Client.jsx",
  },
  output: {
    path: path.resolve(__dirname, "static"),
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
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

const backend = {
  entry: {
    backend: "./src/backend/backend.js"
  },
  output: {
    path: path.resolve(__dirname, "src/backend"),
    filename: "backend-output.js",
    libraryTarget: 'commonjs'
  },
  target: 'node',
  node: {
    __dirname: false,
  },
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
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = [frontend, backend];