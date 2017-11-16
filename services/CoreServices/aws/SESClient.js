"use strict";

var moduleName = __filename;
var awsSesMail = require('aws-ses-mail');
var config = require('config');
var awsConfig = config.aws.ses;
var logger = require('services/CoreServices/Logger')(moduleName);
var sesMail = new awsSesMail();

var sesConfig = {
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
  region: awsConfig.region
};
sesMail.setConfig(sesConfig);

var from = awsConfig.senderEmail;

module.exports.send = function(data, cb){
	var options = {
	  from: from,
	  to: data.toList,
	  subject: data.subject,
	  content: data.body
	};
	sesMail.sendEmailBatch(options, function(data) {
		if(data && data.failedLog && data.failedLog.length>0 ){
			logger.error(data.failedLog);
			cb(data.failedLog);
		}else{
			logger.info("Email sent : "+JSON.stringify(data));			
			cb(null, data);
		}
	});
}