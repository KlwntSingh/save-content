var moduleName = __filename;
var fs = require('fs');
var logger = require('services/CoreServices/Logger')(moduleName);
var config = require('config.json');
var serviceStatusCodes = require('constants/ServiceStatusCodes.js');
var fileUtils = require('utils/FileUtilities.js');

module.exports.listFiles = function(cb){

    fs.readdir(config.contentDir, function(err, files){
        if(err){
            logger.alert(err);
            return cb(null, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        cb(null, serviceStatusCodes.SUCCESS, files);
    })
}


module.exports.saveText = function(data, cb){
        let fileName = fileUtils.getDateAsName(data.name);
        let filePath = config.contentDir + "/" + fileName;
        let writeStream = fs.writeFile(filePath, data.content, function(err, data){
            if(err){
                logger.error(err);
                return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
            }
            cb(null, serviceStatusCodes.SUCCESS, {message : "success"});
        });
}