import express from "express"
const app = express()

import template from "./template"
import path from "path"
import morgan from "morgan"

const config = require("../../../config.json")
const environment = process.env.NODE_ENV || "development"
const environmentConfig = config[environment]

if (environmentConfig.VerboseServer) {
  app.use(morgan('tiny'))
}

// Serving static files
app.use("/assets", express.static(path.join(__dirname, "assets")))

// hide powered by express
app.disable("x-powered-by")
// start the server
app.listen(process.env.PORT || 3000)

let initialState = {
  isFetching: false
}

//SSR function import
import ssr from "../../client/ServerClient"

// server rendered home page
app.get("/", (req, res) => {
  const content = ssr(initialState)
  const response = template("Server Rendered Page", content)
  res.setHeader("Cache-Control", "assets, max-age=604800")
  res.send(response)
})

export default app
