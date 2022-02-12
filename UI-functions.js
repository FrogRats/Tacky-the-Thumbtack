/**
 * @param {string} tackyImage
 * @param {string} tackyText
 */
module.exports = {
  getWebviewContent: function(tackyImage, tackyText) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
    <div>
    <a>${tackyText}</a>
    </div>
	  <img src="${tackyImage}" width="300" />
  </body>
  </html>`; 
  }
}