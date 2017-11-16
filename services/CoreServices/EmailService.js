var moduleName = __filename;

var ses = require('services/CoreServices/aws/SESClient.js');
var config = require('config');
var logger = require('services/CoreServices/Logger')(moduleName);

var adminEmailForCrash = config.adminEmailsForCrash;
var shouldFireEmail = config.shouldFireEmail;

module.exports.sendEmailOnAppCrash = function(data, cb){
	
	let subject = "Save-Text: FATAL Error";
	let mainObj = {};
	mainObj.subject = subject;
	mainObj.body = data.body;
	
	if(shouldFireEmail && adminEmailForCrash){
		logger.debug("sending email on app fatal event");
		mainObj.toList = [adminEmailForCrash];
		ses.send(mainObj, cb);		
	}else{
		cb();
	}
	
}