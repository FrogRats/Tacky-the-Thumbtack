/**
 * @param {string} tackyImage
 * @param {string} tackyText
 */
module.exports = {
  getWebviewContent: function(tackyImage, tackyText) {
	return `<!DOCTYPE html>
  <html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <style>
          .bubble {
            position: relative;
            font-family: sans-serif;
            font-size: 18px;
            line-height: 24px;
            width: 300px;
            background: #fff;
            border-radius: 40px;
            padding: 24px;
            text-align: center;
            color: #000;
          }
          
          .bubble-bottom-left:before {
            content: "";
            width: 0px;
            height: 0px;
            position: absolute;
            border-left: 24px solid #fff;
            border-right: 12px solid transparent;
            border-top: 12px solid #fff;
            border-bottom: 20px solid transparent;
            left: 200px;
            bottom: -24px;
        </style>
        
        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet"> 

        <!-- Page Title -->
        <title>Tacky's Box</title>
    </head>

    <body>

        <!-- Content -->
        <div class = "container my-4">
          <div class = "row">
            <div class = "col-md-6 mx-auto">
            <div class="bubble bubble-bottom-left" contenteditable>${tackyText}</div>
              <img src = "${tackyImage}" class = "img-fluid" alt = "Tacky Logo">
            </div>
          </div>
        </div>

        </body>
</html>`; 
  }
}

