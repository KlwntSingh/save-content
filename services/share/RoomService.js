var moduleName = __filename;
var fs = require("fs");
var fsmkdir = require('mkdirp');
var config = require("config.json");
var roomDao = require("dao/share/RoomDao.js");
var logger = require('services/CoreServices/Logger')(moduleName);
var serviceStatusCodes = require('constants/ServiceStatusCodes.js');
let shareDir = config.shareDir;

module.exports.list = function(cb){
    roomDao.list(function(err, rs){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        cb(null, serviceStatusCodes.SUCCESS, rs);
    });
}

module.exports.findOrCreateRoomByName = function(data, cb){
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
    var self = this;
    roomDao.createRoom(data, function(err, rs){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        if(rs){
            data.id = rs.insertId;
            let roomPath = shareDir + "/" + data.roomName;
            fs.mkdir(roomPath, function(err, status){
                if(err){
                    logger.error(err);
                    logger.alert(err);
                    return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
                }
                self.getRoomById(data, cb)
            })
        }else{
            return cb({message : "Something went wrong"}, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}

module.exports.getRoomById = function(data, cb){
    roomDao.getRoomById(data, function(err, rs){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        if(rs && rs.length > 0){
            cb(null, serviceStatusCodes.SUCCESS, rs[0]);
        }else{
            cb({message : "No Room Found"}, serviceStatusCodes.NOT_FOUND);
        }
    })
}

module.exports.deleteRoom = function(data, cb){
    console.log(data);
    roomDao.deleteRoom(data, function(err, rs){
        if(err){
            logger.error(err);
            logger.alert(err);
            return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
        }
        let roomPath = shareDir + "/" + data.roomName;
        fs.rmdir("." + "/" + roomPath, function(err, status){
            if(err){
                logger.error(err);
                logger.alert(err);
                return cb(err, serviceStatusCodes.INTERNAL_SERVER_ERROR);
            }
            return cb(null, serviceStatusCodes.SUCCESS, {message : "Room Deleted Successsfull"});
        })
    });
}