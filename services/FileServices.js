var moduleName = __filename;
var fs = require('fs');
var fsmkdir = require('mkdirp');
var logger = require('services/CoreServices/Logger')(moduleName);
var config = require('config.json');
var serviceStatusCodes = require('constants/ServiceStatusCodes.js');
var fileUtils = require('utils/FileUtilities.js');

fsmkdir.sync(config.contentDir);

module.exports.listFiles = function(cb){

    fs.readdir(config.contentDir, function(err, files){
        if(err){
            logger.alert(err);
            return cb(null, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        var rTurn = {};
        rTurn.files = files;
        cb(null, serviceStatusCodes.SUCCESS, files);
    })
}

module.exports.readContentOfFile = function(data, cb){
    var nameOfFile = data.name;
    fs.readFile(config.contentDir + "/" + nameOfFile, function(err, content){
        if(err){
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        var rTurn = {};
        rTurn.content = content;
        rTurn.fileName = nameOfFile;
        rTurn.path = config.contentDir;
        console.log(rTurn);
        cb(null, serviceStatusCodes.SUCCESS, rTurn);
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