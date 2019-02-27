import express from "express"
const app = express()

import view from "./view"
import path from "path"
import morgan from "morgan"

const config = require("../../config.json")
const environment = process.env.NODE_ENV || "development"
const environmentConfig = config[environment]

if (environmentConfig.VerboseServer) {
  app.use(morgan('tiny'))
}

if (environmentConfig.ServeStatic) {
  app.use("/static", express.static(path.join(__dirname, "../../static")))
}

app.disable("x-powered-by")
app.listen(process.env.PORT || 3000)

let initialState = {
  isFetching: false
}

import ssr from "./ServerClient"

app.get("/", (req, res) => {
  const content = ssr(initialState)
  const response = view("Server Rendered Page", content)
  res.setHeader("Cache-Control", "assets, max-age=604800")
  res.send(response)
})

export default app
