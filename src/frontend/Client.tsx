import React from "react"
import { hydrate } from "react-dom"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import App from "./components/App"

import { rootReducer, rootEpic } from './store'
import { createEpicMiddleware } from "redux-observable";

// Get initial state as injected by server
// const initialState = window.__PRELOADED_STATE__


const loggerMiddleware = createLogger()
const epicMiddleware = createEpicMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware, loggerMiddleware)
)

epicMiddleware.run(rootEpic)

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
)
