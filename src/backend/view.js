const template = (title, content = "") => {
  let page =
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title> ${title} </title>
    <link rel="stylesheet" href="https://indestructibletype.com/fonts/Jost.css" type="text/css" charset="utf-8" />
    <link href="static/style.css" rel="stylesheet">
  </head>
  <body>
    <div class="content">
        <div id="app" class="wrap-inner">${content}</div>
    </div>
    <script src="static/client.js"> </script>
  </body>
</html>`

  return page
}

export default template
