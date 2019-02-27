const express = require("express"),
  app = express(),
  template = require("./template"),
  path = require("path")
  morgan = require('morgan')

const config = require("../../../config.json");
const environment = process.env.NODE_ENV || "dev";
const environmentConfig = config[environment];

if (environmentConfig["VerboseServer"]) {
  app.use(morgan('tiny'))
}

// Serving static files
app.use("/assets", express.static(path.resolve(__dirname, "assets")))

// hide powered by express
app.disable("x-powered-by")
// start the server
app.listen(process.env.PORT || 3000)

let initialState = {
  isFetching: false
}

//SSR function import
const ssr = require("../../client/views/ServerClient")

// server rendered home page
app.get("/", (req, res) => {
  const { content } = ssr(initialState)
  const response = template("Server Rendered Page", content)
  res.setHeader("Cache-Control", "assets, max-age=604800")
  res.send(response)
})

module.exports = app
