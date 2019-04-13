import { AppState, initialState } from '../frontend/store/types'

const template = (title: string, content: string = "", preloadedState: AppState = initialState) => (
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${title} </title>
    <link rel="stylesheet" href="https://indestructibletype.com/fonts/Jost.css" type="text/css" charset="utf-8" />
    <link href="static/style.css" rel="stylesheet">
  </head>
  <body>
    <div class="content">
        <div id="app" class="wrap-inner">${content}</div>
    </div>
    <script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src="static/client.js"> </script>
  </body>
</html>`)


export default template
