import React from "react"
import { renderToString } from "react-dom/server"

import App from "./components/App"

const ssr = (initialState) => {
  let content = renderToString(<App />)
  return { content }
}

export default ssr
