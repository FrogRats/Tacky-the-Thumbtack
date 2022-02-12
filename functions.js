/**
 * @param {string} cats
 */
function getWebviewContent(cats) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <img src="${cats}" width="300" />
  </body>
  </html>`;
  }