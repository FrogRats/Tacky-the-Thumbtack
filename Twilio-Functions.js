const twilioNumber = '+447700169666'
let userNumber;

const vscode = require('vscode');




module.exports = {
	/**
	* @param {string} number
 	*/
	setNumber: function(number) {
		if (isNumberValid(number)) {
			userNumber = number;
		}
	},

	/**
	* @param {string} body
 	*/
    sendMessage: function(body) {
		
		const accountSid =  vscode.workspace.getConfiguration('thumbtack').get('TwilioSID').toString();
		const authToken =   vscode.workspace.getConfiguration('thumbtack').get('TwilioAUTH').toString();
		const client = require('twilio')(accountSid, authToken);
		client.messages.create({
			body: body, // Message body,
			to: userNumber, // Text this number
			from: twilioNumber // From a valid Twilio number
		});
	
    },
	
	makeCall: function() {
		
			const accountSid =  vscode.workspace.getConfiguration('thumbtack').get('TwilioSID').toString();
			const authToken =  vscode.workspace.getConfiguration('thumbtack').get('TwilioAUTH').toString();
		const client = require('twilio')(accountSid, authToken);
		client.calls.create({
			
			url: 'https://frogratsfunction.azurewebsites.net/api/MakeVoiceCall?',
			to: userNumber,
			from: twilioNumber
		});
	
	}

}

/**
 * @param {string} number
 */
function isNumberValid(number) {
	const regex = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
	return regex.test(number);
}