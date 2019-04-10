import React from "react"
import { renderToString } from "react-dom/server"

import App from "../frontend/components/App"

const ssr = (initialState: any) => {
  let content = renderToString(<App message="Lambda-rendered" />)
  return content
}

export default ssr
