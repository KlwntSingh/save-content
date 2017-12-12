var moduleName = __filename;
var fs = require('fs');
var config = require("config.json");
var logger = require('services/CoreServices/Logger')(moduleName);
var serviceStatusCodes = require('constants/ServiceStatusCodes.js');
let shareDir = config.shareDir;

module.exports.listContent = function(data, cb){
    var roomPath = shareDir + "/" +  data.roomName;
    fs.readdir(roomPath, function(err, rs){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null, serviceStatusCodes.SUCCESS, rs);
    })
}

module.exports.getRoomByName = function(data, cb){
    var self = this;
    roomDao.findRoomByName(data, function(err, rs){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        if(rs && rs.length >0){
            cb(null, serviceStatusCodes.SUCCESS, rs[0]);
        }else{
            if(data.password){
                return cb({ message : "Authorization required" }, serviceStatusCodes.UNAUTHORISED);
            }else{
                self.createRoom(data, cb)
            }
        }
    });
}

module.exports.createRoom = function(data, cb){
    roomDao.createRoom(data, function(err, rs){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        cb(null, serviceStatusCodes.CREATED);
    });
}