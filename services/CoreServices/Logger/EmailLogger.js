/**
 * Logger file
 */
"use strict";
var moduleName = __filename;
var emailService = require("services/CoreServices/EmailService.js");
var logger = require('services/CoreServices/Logger')(moduleName);
var config = require('config.json');
var sendEmail = config.sendEmail;
module.exports = function(moduleName, data, cb){cb
    var body = {
        moduleName : moduleName,
        body : data
    }
    if(sendEmail){
        emailService.sendEmailOnAppCrash(body, function(err){
            if(err)
                logger.error(err);
                
        })
    }else{

    }
}