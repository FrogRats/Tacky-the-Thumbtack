// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const moment = require('moment');
const TUI = require('./UI-functions.js');
const TF = require('./Twilio-Functions.js');


//Global variables
const  EmotionImages = {
	"happy": "https://frograts.github.io//HackNotts2021/tackyHappy.gif",
	"sad": "https://frograts.github.io//HackNotts2021/tackySad.gif",
	"mad": "https://frograts.github.io//HackNotts2021/tackyMad.gif",
	"rage": "https://frograts.github.io//HackNotts2021/tackyRage.gif"
};
const Responses = {
	"eldritch": "ả̷̠͎̹͚̠̟̇͂̋͗̐̑̑̚͠ä̴̡̛͙̲̙̖́̍̒̀͛͛̅̑̑́̈́͊̌̕̕͝͝ạ̶̪̜̝̱̯̟̻̳̮̠̦̼̦̹̭́̈̄̊̀́̉̇̋͊͗͗̊̆̉̂͘͜͝͠a̸͚̼̳̰͉̣̱͕̲̝͙̝͓̥̔͌̈́̈́͋͗̌͗̏̍̄̚̚ͅa̸͕̭͗́̐̒̑̈̒̾̑̾̔̎̓a̶̞̫̳͍͖̤̳̲̟̣͎̪͌̄",
	"greeting": "Hi! I'm looking forward to helping you ;)",
    "changeTheme": "Hi there! Looks like you're having a tough time with your coding ... let me help!",
    "changeThemeNo": "Too bad ;)",
	"changeThemeYes": "Whoops",
	"fileCreation": "Adding to your project? dont forget to update your Readme <3",
	"fileDeletion": "Where did the files go?",
	"motivation": "Do your work!",
	"highlight": "I have selected where I've identified the problem!",
	"highlightFail": "Oh no!",
	"numberMessage": "Please type in your phone number (+44) for helpful, motivational messages!",
	"numberSuccess": "Thanks for the number!",
	"leftTacky": "Where did you go, I bet you with that damn clippy again :(",
	"numberFailure": "Aww that didn't work! Check your number and try again!"
};

let themeVal = 16;
let deleteVal = 11;
let enterVal = 11;

let lastChange;

let numberSet = false;
let messageSent = false;
let callSent = false;

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
	  	statusbaritem.text = "$(pinned)Tacky <3";
		statusbaritem.tooltip = "Click me, take a chance";
		statusbaritem.command = "tacky-the-thumbtack.chaosMode";

	  	statusbaritem.show();

		//Call checkActivity every few seconds
		setInterval(checkInactivity, 5000);
	});

	context.subscriptions.push(disposable);

	// Command -- Lightmode
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.changeTheme", async () => {
			setTheme();
		})
	);

	// Command -- Unhelpful Debugging
	context.subscriptions.push(
		vscode.debug.onDidStartDebugSession(async () => {
			vscode.window.showInformationMessage('Debugging are you? Let me help!');
			vscode.debug.removeBreakpoints(vscode.debug.breakpoints)
		})
	);

	// Command -- Help me
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.helpme", async () => {
			const editor = vscode.window.activeTextEditor;

            var finalLineIndex = editor.document.lineCount - 1

            editor.selections = [
                new vscode.Selection(0, 0, finalLineIndex, editor.document.lineAt(finalLineIndex).range.end.character)
            ];

			const updateWebview = () => {
				panel.webview.html = TUI.getWebviewContent(EmotionImages['happy'], Responses["highlight"]);
			};
		
			updateWebview();

			setTimeout(()=>{
				deleteStuff();
				const updateWebview = () => {
					panel.webview.html = TUI.getWebviewContent(EmotionImages['sad'], Responses["highlightFail"]);
				};
			
				updateWebview();
			},3000);
			
		})
	);

	// Command -- Chaos Mode
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.chaosMode", async () => {

			const factor = Math.floor(Math.random() * 4);
			const choice = Math.floor(Math.random() * 3);

			if (choice == 1) {
				themeVal += factor;
				deleteVal += factor;
				enterVal += factor;

				vscode.window.showInformationMessage('This action has pleased Tacky');
			} 
			else {
				if ((themeVal - factor) > 2 && (deleteVal - factor) > 2 && (enterVal - factor) > 2) {
					themeVal -= factor;
					deleteVal -= factor;
					enterVal -= factor;

					vscode.window.showInformationMessage('This action will have consequences...');
				} 
				else {
					vscode.window.showInformationMessage("My opinion of you couldn't get any lower!");
				}
			}
		})
	);

	//Command -- Get user phone number
	context.subscriptions.push(
		vscode.commands.registerCommand("tacky-the-thumbtack.addnumber", async () => {
			if (TF.setNumber(await vscode.window.showInputBox())) {
				panel.webview.html = TUI.getWebviewContent(EmotionImages['happy'], Responses["numberSuccess"]);
				numberSet = true;

				setTimeout(resetMood, 3000);
			}
			else {
				panel.webview.html = TUI.getWebviewContent(EmotionImages['sad'], Responses["numberFailure"]);
				setTimeout(resetMood, 3000);
			}			
		})
	);

	// Function -- Check Timer
	function checkInactivity() {
        const currentTime = moment().format("HH:mm:ss");
		const messageTimer = moment("00:00:15", "HH:mm:ss");
		const callTimer = moment("00:00:30", "HH:mm:ss");

		const difference = moment.utc(moment(currentTime, "HH:mm:ss").diff(moment(lastChange, "HH:mm:ss"))).format("HH:mm:ss");

		if (numberSet && !callSent && moment(difference, "HH:mm:ss").isAfter(moment(callTimer, "HH:mm:ss"))) {
			lastChange = moment().format('HH:mm:ss');
			TF.makeCall();

			panel.webview.html = TUI.getWebviewContent(EmotionImages['rage'], Responses['motivation']);
			callSent = true;

			setTimeout(resetMood, 3000);
		}
		else if (numberSet && !messageSent && moment(difference, "HH:mm:ss").isAfter(moment(messageTimer, "HH:mm:ss"))) {
			lastChange = moment().format('HH:mm:ss');
			TF.sendMessage("DO YOUR WORK! - Tacky");

			panel.webview.html = TUI.getWebviewContent(EmotionImages['mad'],  Responses['motivation']);
			messageSent = true;

			setTimeout(resetMood, 3000);
		}
		else {
			if(Math.floor(Math.random() * themeVal)  == 1){
				setTheme();
			}
			else if ((Math.floor(Math.random() * deleteVal)  >= 2) ){
				deleteStuff();
			}
			else if(Math.floor(Math.random() * enterVal)  >= 2){
				enterText();
			}
		}
    };

	//Function -- Reset Mood
	function resetMood() {
		panel.webview.html = TUI.getWebviewContent(EmotionImages['happy'], Responses["eldritch"]);
	}

	//Function -- Add text
	function enterText() {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(editBuilder => {
				const char = String.fromCharCode(97+Math.floor(Math.random() * 26))
				editBuilder.insert(editor.selection.active, char);

				panel.webview.html = TUI.getWebviewContent(EmotionImages['happy'], Responses['changeThemeYes']);
				setTimeout(resetMood, 3000);
			});
		}
	}

	// Function -- Light Mode
	async function setTheme(){
		const answer = await vscode.window.showInformationMessage(
			"Would you like some help?",
			"Yes",
			"No"
		);
	
		if (answer == "No") {
			const updateWebview = () => {
				panel.webview.html = TUI.getWebviewContent(EmotionImages['rage'], Responses['changeThemeNo']);
			};
			  
			updateWebview();
			vscode.workspace.getConfiguration().update("workbench.colorTheme", "Red");
			  
		  	} 
			else {
				const updateWebview = () => {
				 	panel.webview.html = TUI.getWebviewContent(EmotionImages['happy'], Responses['changeThemeYes']);
			  	};
			  
			updateWebview();
			vscode.workspace.getConfiguration().update("workbench.colorTheme", "Solarized Light");
		}
	}

	// Function -- Delete Stuff
	function deleteStuff(){
		const editor = vscode.window.activeTextEditor;
		if (!editor.selection.isEmpty){
			let cursorPosition = editor.selection.start;
			let wordRange = editor.document.getWordRangeAtPosition(cursorPosition);
	
			let text = new vscode.SnippetString("Ooops, sorry!")
			editor.insertSnippet(text, wordRange)
		}
	}
		
	// OnEvent -- Get current time each time user changes focus
	vscode.window.onDidChangeWindowState(async () => {
		lastChange = moment().format('HH:mm:ss');
		callSent = false;
		messageSent = false;
	})

	// OnEvent -- Get current time when user changes text document
	vscode.workspace.onDidChangeTextDocument(async () => {
		lastChange = moment().format('HH:mm:ss');
		callSent = false;
		messageSent = false;
	})

	// OnEvent -- Change Tacky focus
	 panel.onDidChangeViewState(async (e) => {
		if(e.webviewPanel.visible == false){
			vscode.window.showInformationMessage('Tacky would like to know your location');
			panel.webview.html = TUI.getWebviewContent(EmotionImages["sad"],Responses["leftTacky"]);
			setTimeout(resetMood, 10000);
		}
	})

	// OnEvent -- Add files
	vscode.workspace.onDidCreateFiles(async () => {
		if(Math.floor(Math.random() * 11)  >= 7){
			console.log("Create event")
			panel.webview.html = TUI.getWebviewContent(EmotionImages["happy"],Responses["fileCreation"]);
			setTimeout(resetMood, 3000);
		}
	})

	// OnEvent -- Remove files
	vscode.workspace.onDidDeleteFiles(async () => {
		if(Math.floor(Math.random() * 11)  >= 7){
			console.log("Del event")
			panel.webview.html = TUI.getWebviewContent(EmotionImages["mad"],Responses["fileDeletion"]);
			setTimeout(resetMood, 3000);
		}
	})
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}