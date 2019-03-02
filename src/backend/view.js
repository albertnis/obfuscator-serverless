const template = (title, content = "") => {
  let page =
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title> ${title} </title>
    <link href="assets/style.css" rel="stylesheet">
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
