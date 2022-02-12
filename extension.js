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
	"changeThemeNo": "Too bad ;)"
};
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
		'tackyChat',
		'Tacky Chat',
		vscode.ViewColumn.Two,
		{}
	  );

	// Function -- Init Tacky
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

	// Function -- Lightmode
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.changeTheme", async () => {
			const updateWebview = () => {
			panel.webview.html = TUI.getWebviewContent(EmotionImages['sad'], Responses['changeTheme']);
			};
		
			 // Set initial content
			updateWebview();

			const answer = await vscode.window.showInformationMessage(
			  "Will you let me help?",
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
				vscode.workspace.getConfiguration().update("workbench.colorTheme", "Default Dark+");
			}
		  })
	);

	// Function -- Message
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.message", async () => {
			const userNumber = await vscode.window.showInputBox()
			const twilioNumber = '+447700169666'

			const accountSid = "ACad2d6631ebbb3405cd80e856341afdf4";
			const authToken = "29b4094c9384eed24a20e47afdeb596f"; 

			const client = require('twilio')(accountSid, authToken);

			client.messages.create({
    			body: 'Hello from Tacky!',
    			to: userNumber, // Text this number
    			from: twilioNumber, // From a valid Twilio number
			})

		  })
	);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

