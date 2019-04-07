const path = require("path");

// Frontend - bundle for client
const frontend = {
  entry: {
    frontend: "./src/frontend/Client.tsx",
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "client.js"
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use:
        {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};

// Backend - output for running as server (node backend.js)
const backend = {
  entry: {
    backend: "./src/backend/backend.js"
  },
  output: {
    path: path.resolve(__dirname, "src/backend/dist"),
    filename: "[name].js",
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
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use:
        {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};

// Server - Serverless-Side Rendering provider. Function version of backend.js
const server = {
  entry: {
    server: "./src/functions/server/server.js"
  },
  output: {
    path: path.resolve(__dirname, "src/functions/server/dist"),
    filename: "[name].js",
    libraryTarget: 'commonjs'
  },
  target: 'node',
  node: {
    __dirname: false,
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
        test: /\.node$/,
        exclude: /node_modules/,
        use:
        {
          loader: "node-loader"
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use:
        {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};

module.exports = [frontend, backend, server];