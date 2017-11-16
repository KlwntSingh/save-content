/**
 * Logger file
 */
"use strict";
var moduleName = __filename;
var emailService = require("services/CoreServices/EmailService.js");
var logger = require('services/CoreServices/Logger')(moduleName);

module.exports = function(moduleName, data, cb){
    var body = {
        moduleName : moduleName,
        body : data
    }
    emailService.sendEmailOnAppCrash(body, function(err){
        if(err)
            logger.error(err);
            
    })
}