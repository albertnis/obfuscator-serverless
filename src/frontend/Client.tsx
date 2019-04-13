import React from "react"
import { hydrate } from "react-dom"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import App from "./components/App"

import { rootReducer } from './store'

// Get initial state as injected by server
// const initialState = window.__PRELOADED_STATE__


const loggerMiddleware = createLogger()
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware))

hydrate(
    <Provider store={store}>
        <App message="Take the following English phrase:" />
    </Provider>,
    document.getElementById("app")
)
