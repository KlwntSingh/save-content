var moduleName = __filename;
var fs = require('fs');
var fsmkdir = require('mkdirp');
var logger = require('services/CoreServices/Logger')(moduleName);
var config = require('config.json');
var serviceStatusCodes = require('constants/ServiceStatusCodes.js');
var fileUtils = require('utils/FileUtilities.js');

let contentDir = config.saveDir;

module.exports.listFiles = function(cb){

    fs.readdir(contentDir, function(err, files){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        var rTurn = {};
        rTurn.files = files;
        cb(null, serviceStatusCodes.SUCCESS, files);
    })
}

module.exports.readContentOfFile = function(data, cb){
    var nameOfFile = data.name;
    fs.readFile(contentDir + "/" + nameOfFile, function(err, content){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        var rTurn = {};
        rTurn.content = content;
        rTurn.fileName = nameOfFile;
        rTurn.path = contentDir;
        cb(null, serviceStatusCodes.SUCCESS, rTurn);
    })
}

module.exports.saveText = function(data, cb){
        let fileName = fileUtils.getDateAsName(data.name);
        let filePath = contentDir + "/" + fileName;
        let writeStream = fs.writeFile(filePath, data.content, function(err, data){
            if(err){
                logger.error(err);
                logger.alert(err);
                return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
            }
            cb(null, serviceStatusCodes.SUCCESS, {message : "success"});
        });
}