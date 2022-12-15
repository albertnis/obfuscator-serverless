import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import App from './components/App'

import { rootReducer, rootEpic } from './store'
import { createEpicMiddleware } from 'redux-observable'

// Get initial state as injected by server
// const initialState = window.__PRELOADED_STATE__

console.log('URL is', import.meta.env.VITE_GLOBAL_TRANSLATE_API_URL)

const loggerMiddleware = createLogger()
const epicMiddleware = createEpicMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware, loggerMiddleware)
)

epicMiddleware.run(rootEpic)

hydrateRoot(
  document.getElementById('app'),
  <Provider store={store}>
    <App />
  </Provider>
)
