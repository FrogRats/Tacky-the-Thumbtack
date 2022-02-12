// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const TUI = require('./UI-functions.js');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tacky-the-thumbtack" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tacky-the-thumbtack.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Tacky The Thumbtack!');
	});

	// Function -- Start
	context.subscriptions.push(disposable);
	context.subscriptions.push(
		vscode.commands.registerCommand('tacky-the-thumbtack.start', () => {
		  const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{}
		  );
			
		  const updateWebview = () => {
			panel.webview.html = TUI.getWebviewContent('https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif', "HelloFrom T ;)");
		  };5
	
		  // Set initial content
		  updateWebview();
	
		  // And schedule updates to the content every second
		  setInterval(updateWebview, 1000);
		})
	  );

	// Function -- Lightmode
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.askQuestion", async () => {
			const answer = await vscode.window.showInformationMessage(
			  "How was your day?",
			  "Good!",
			  "Bad :("
			);
	  
			if (answer === "Bad :(") {
			  	vscode.window.showInformationMessage("Sorry to hear that $(alert)");
				vscode.workspace.getConfiguration().update("workbench.colorTheme", "Solarized Light");
				
			} else {
				vscode.window.showErrorMessage("TEST")
				vscode.workspace.getConfiguration().update("workbench.colorTheme", "Default Dark+");
			}
		  })
	);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

