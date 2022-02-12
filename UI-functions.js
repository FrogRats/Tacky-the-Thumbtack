/**
 * @param {string} cats
 * @param {string} textbox
 */
module.exports = {
  getWebviewContent: function(cats, textbox) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
    <div>
    <a>${textbox}</a>
    </div>
	  <img src="${cats}" width="300" />
  </body>
  </html>`; 
  }
}