// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const moment = require('moment');
const TUI = require('./UI-functions.js');
const TF = require('./Twilio-Functions.js');
const { systemDefaultArchitecture } = require('@vscode/test-electron/out/util');

//Global variables
const  EmotionImages = {
	"happy": "https://frograts.github.io//HackNotts2021/tackyHappy.gif",
	"sad": "https://frograts.github.io//HackNotts2021/tackySad.gif",
	"mad": "https://frograts.github.io//HackNotts2021/tackyMad.gif",
	"rage": "https://frograts.github.io//HackNotts2021/tackyRage.gif"
};
const Responses = {
	"greeting": "Hi! I'm looking forward to helping you ;)",
    "changeTheme": "Hi there! Looks like you're having a tough time with your coding ... let me help!",
    "changeThemeNo": "Too bad ;)",
	"changeThemeYes": "Whoops",
	"fileCreation": "Adding to your project? dont forget to update your Readme <3",
	"fileDeletion": "Where did the files go?",
	"motivation": "Do your work!"
};

let lastChange;
let userNumber;

/**
 * @param {vscode.ExtensionContext} context
 */
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tacky-the-thumbtack" is now active!');
	const panel = vscode.window.createWebviewPanel(
		'tacky',
		'Tacky',
		vscode.ViewColumn.Two,{}
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tacky-the-thumbtack.awakenTacky', function () {
		// The code you place here will be executed every time your command is executed
		const updateWebview = () => {
			panel.webview.html = TUI.getWebviewContent(EmotionImages['happy'], Responses["greeting"]);
		  };
	
		 // Set initial content
		updateWebview();

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Tacky The Thumbtack!');
		var statusbaritem = vscode.window.createStatusBarItem();
	  	statusbaritem.text = "$(pinned)Tacky <3"
	  	statusbaritem.show();
		// Ask user for phone number
		vscode.window.showInformationMessage('Please type in your phone number (+44) for helpful, motivational messages!');
		userNumber = vscode.window.showInputBox()
		
		//Call checkActivity every few seconds
		setInterval(checkInactivity, 10000);
	});

	context.subscriptions.push(disposable);

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
					panel.webview.html = TUI.getWebviewContent(EmotionImages['rage'], Responses['changeThemeNo']);
				};
				
				// Set initial content
				updateWebview();
				vscode.workspace.getConfiguration().update("workbench.colorTheme", "Red");
				
			} else {
				const updateWebview = () => {
					panel.webview.html = TUI.getWebviewContent(EmotionImages['happy'], Responses['changeThemeYes']);
				};
				
				// Set initial content
				updateWebview();
				vscode.workspace.getConfiguration().update("workbench.colorTheme", "Solarized Light");
			}
		  })
	);

	// Function -- Send SMS to User
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.message", async () => {
			const userNumber = await vscode.window.showInputBox()
			//TF.sendMessage(userNumber);
		  })
	);

	//Function -- Unhelpful Debugging
	context.subscriptions.push(
		vscode.debug.onDidStartDebugSession(async () => {
			vscode.window.showInformationMessage('Debugging are you? Let me help!');
			vscode.debug.removeBreakpoints(vscode.debug.breakpoints)
			})
	);

		// Function -- Help me
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.helpme", async () => {
			//vscode.DocumentHighlight.
		  })
	);

	
	//Function -- Check Timer
	function checkInactivity() {
        const currentTime = moment().format("HH:mm:ss");
		const timeThreshold = moment("00:00:30", "HH:mm:ss");

		const difference = moment.utc(moment(currentTime, "HH:mm:ss").diff(moment(lastChange, "HH:mm:ss"))).format("HH:mm:ss");

		if (moment(difference, "HH:mm:ss").isAfter(moment(timeThreshold, "HH:mm:ss"))) {
			lastChange = moment().format('HH:mm:ss');

			//TF.sendMessage(userNumber, "DO YOUR WORK! - Tacky");
			vscode.window.showInformationMessage(Responses["motivation"]);
		}
    };

	//Function -- Get current time each time user changes focus
	vscode.window.onDidChangeWindowState(async () => {
		lastChange = moment().format('HH:mm:ss');
	})

	//Get current time when user changes text document
	vscode.workspace.onDidChangeTextDocument(async () => {
		console.log("trigger");
		lastChange = moment().format('HH:mm:ss');
	})

	//Function -- Change Tacky focus
	panel.onDidChangeViewState(async () => {
		vscode.window.showInformationMessage('Pay attention to Tacky ... :(');
	})

	//Function -- Add files
	vscode.workspace.onDidCreateFiles(async () => {
		if(Math.floor(Math.random() * 11)  >= 7){
		console.log("Create event")
		panel.webview.html = TUI.getWebviewContent(EmotionImages["happy"],Responses["fileCreation"]);
		}
	})

	//Function -- Remove files
	vscode.workspace.onDidDeleteFiles(async () => {
		if(Math.floor(Math.random() * 11)  >= 7){
		console.log("Del event")
		panel.webview.html = TUI.getWebviewContent(EmotionImages["mad"],Responses["fileDeletion"]);
		}
	})
	
	
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

