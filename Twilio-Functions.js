module.exports = {
	/**
 	* @param {string} number
	* @param {string} body
 	*/
    sendMessage: function(number, body) {
		if (isNumberValid(number)) {
			const twilioNumber = '+447700169666'

			const accountSid = "ACad2d6631ebbb3405cd80e856341afdf4";
			const authToken = "29b4094c9384eed24a20e47afdeb596f"; 

			const client = require('twilio')(accountSid, authToken);

			client.messages.create({
    			body: body, // Message body,
    			to: number, // Text this number
    			from: twilioNumber, // From a valid Twilio number
				})
		}
		else {
			console.log("Invalid Number!")
		}
        
    }
  }

/**
 * @param {string} number
 */
function isNumberValid(number) {
	const regex = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
	return regex.test(number);
}