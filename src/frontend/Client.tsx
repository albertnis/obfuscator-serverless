import React from "react"
import { hydrate } from "react-dom"

import App from "./components/App"

hydrate(<App message="Take the following English phrase:" />, document.getElementById("app"))
