const path = require("path");
const webpack = require("webpack")
const env = require("./env")

var environment = process.argv.indexOf('-p') !== -1 ? 'production' : 'development';
console.log('env is ', environment)
console.log('GLOBAL_TRANSLATE_API_URL is ', JSON.stringify(env.TRANSLATE_API_URL[environment]))

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
  devServer: {
    contentBase: path.resolve(__dirname, '.'),
    port: 4000
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'GLOBAL_TRANSLATE_API_URL': JSON.stringify(env.TRANSLATE_API_URL[environment])
    })
  ]
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'GLOBAL_TRANSLATE_API_URL': JSON.stringify(env.TRANSLATE_API_URL[environment])
    })
  ]
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'GLOBAL_TRANSLATE_API_URL': JSON.stringify(env.TRANSLATE_API_URL[environment])
    })
  ]
};

// Translate - Translate API
const translate = {
  entry: {
    translate: "./src/functions/translate/translate.ts"
  },
  output: {
    path: path.resolve(__dirname, "src/functions/translate/dist"),
    filename: "[name].js",
    libraryTarget: 'commonjs'
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  // AWS sdk is available externally in Lambda nodejs runtime
  externals: ['aws-sdk'],
  module: {
    rules: [
      {
        test: /\.js$/,
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
        test: /\.ts$/,
        exclude: /node_modules/,
        use:
        {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
};


module.exports = [frontend];