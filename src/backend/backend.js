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

app.use("/static", express.static("static"))

app.disable("x-powered-by")
app.listen(process.env.PORT || 3001)

import ssr from "./ServerClient"

app.get("/", (req, res) => {
  const { content, state } = ssr()
  const response = view("Obfuscator", content, state)
  res.setHeader("Cache-Control", "assets, max-age=604800")
  res.send(response)
})

export default app
