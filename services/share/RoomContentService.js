var moduleName = __filename;
var fs = require('fs');
var config = require("config.json");
var logger = require('services/CoreServices/Logger')(moduleName);
var serviceStatusCodes = require('constants/ServiceStatusCodes.js');
let shareDir = config.shareDir;

module.exports.listContent = function(data, cb){
    var roomPath = shareDir + "/" +  data.roomName + "/";
    console.log(roomPath);
    fs.readdir(roomPath, function(err, rs){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        console.log(rs);
        rs = rs.map((item)=>{
            let extArr =  item.split("\.");
            return {
                fileName : item,
                type: extArr[extArr.length - 1]
            }
        });
        return cb(null, serviceStatusCodes.SUCCESS, rs);
    })
}

module.exports.deleteFileInRoom = function(data, cb){
    let filePath = shareDir + "/" + data.roomName + "/" + data.fileName;
    fs.unlink(filePath, function(err, rs){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null, serviceStatusCodes.SUCCESS, {message : "success"});
    });
}

module.exports.getFile = function(data, cb){
    let filePath = shareDir + "/" + data.roomName + "/" + data.fileName;
    fs.readFile(filePath, function(err, data){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        var img = new Buffer(data).toString('base64');
        return cb(null, serviceStatusCodes.SUCCESS, {img : img});
    })
}

module.exports.getFileForDownload = function(data, cb){
    let filePath = shareDir + "/" + data.roomName + "/" + data.fileName;
    let rs = {};
    rs.file = true;
    rs.path = filePath;
    return cb(null, serviceStatusCodes.SUCCESS, rs);
}