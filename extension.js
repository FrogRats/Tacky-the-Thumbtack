// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const TUI = require('./UI-functions.js');
const  EmotionImages = {
	"happy": "https://frograts.github.io//HackNotts2021/tackyHappy.png",
	"sad": "https://avatars.githubusercontent.com/u/56484022?v=4",
	"mad": "https://frograts.github.io//HackNotts2021/tackyMad.png"
  };
  
const Responses = {
    "changeTheme": "Hi there! Looks like you're having a tough time with your coding ... let me help!",
    "changeThemeNo": "Too bad ;)",
	"FileCreation": "Adding to your project? dont forget to your Readme <3"};

const TF = require('./Trilio-Functions.js');
const { Console } = require('console');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tacky-the-thumbtack" is now active!');
	const panel = vscode.window.createWebviewPanel(
		'tacky',
		'Tacky',
		vscode.ViewColumn.Two,
		{}
	  );
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tacky-the-thumbtack.awakenTacky', function () {
		// The code you place here will be executed every time your command is executed
		const updateWebview = () => {
			panel.webview.html = TUI.getWebviewContent(EmotionImages['happy'], "Hannah T ;)");
		  };
	
		 // Set initial content
		updateWebview();

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Tacky The Thumbtack!');

	});
	// Function -- Start
	context.subscriptions.push(disposable);
	context.subscriptions.push(
		vscode.commands.registerCommand('tacky-the-thumbtack.start', () => {
		  
			
		  const updateWebview = () => {
			panel.webview.html = TUI.getWebviewContent('https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif', "HelloFrom T ;)");
		  };
	
		  // Set initial content
		  updateWebview();
	
		  // And schedule updates to the content every second
		  //setInterval(updateWebview, 1000);
		})
	  );

	// Function -- Lightmode
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.changeTheme", async () => {
			const answer = await vscode.window.showInformationMessage(
			  "Do you accept my help?",
			  "Yes",
			  "No"
			);
	  
			if (answer === "No") {
				const updateWebview = () => {
					panel.webview.html = TUI.getWebviewContent(EmotionImages['mad'], Responses['changeThemeNo']);
				};
				
				// Set initial content
				updateWebview();
				vscode.workspace.getConfiguration().update("workbench.colorTheme", "Solarized Light");
				
			} else {
				vscode.window.showErrorMessage("TEST")
				vscode.workspace.getConfiguration().update("workbench.colorTheme", "Default Dark+");
			}
		  })
	);

	// Function -- Message
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.message", async () => {
			const userNumber = await vscode.window.showInputBox()
			TF.sendMessage(userNumber);
		  })
	);

	//Function -- Timer
	panel.onDidChangeViewState(async () => {
		console.log("test")
	})
	vscode.workspace.onDidCreateFiles(async () => {
		console.log("???")
		panel.webview.html = TUI.getWebviewContent(EmotionImages["happy"],Responses["FileCreation"]);

	})
	
	
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

