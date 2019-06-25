import React from "react"
import { renderToString } from "react-dom/server"

import App from "../frontend/components/App"
import { createStore } from "redux";
import { rootReducer } from "../frontend/store";
import { Provider } from "react-redux";
import { AppState } from "../frontend/store";

const store = createStore(
  rootReducer
)

const ssr = (): {content: string, state: AppState} => {
  let content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
  let state = store.getState()
  return { content, state }
}

export default ssr
