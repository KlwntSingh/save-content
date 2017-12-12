var pool = require("../db-config");

module.exports.list = function(cb){
    pool.query("SELECT id, roomName FROM room", function(err, rs, fields){
        if(err){
            return cb(err);
        }
        cb(null, rs);
    });
}

module.exports.createRoom = function(data, cb){
    pool.query("INSERT INTO room(roomName) values(?)", [data.roomName], function(err, rs, fields){
        if(err){
            return cb(err);
        }
        cb(null, rs);
    });
}

module.exports.findRoomByName = function(data, cb){
    var query = "SELECT id, roomName, passwordRequired FROM room where roomName = ? ";
    var args = [];
    args.push(data.roomName);
    
    if(data.password){
        query += " and password = ? and passwordRequired = 1 ";
        args.push(data.password);
    }

    pool.query(query, args,  function(err, rs, fields){
        if(err){
            return cb(err);
        }
        cb(null, rs);
    });
}

module.exports.deleteRoom = function(data, cb){
    var query = "DELETE FROM room where id = ? ";
    var args = [];
    args.push(data.id);

    pool.query(query, args,  function(err, rs, fields){
        if(err){
            return cb(err);
        }
        cb(null, rs);
    });
}

module.exports.getRoomById = function(data, cb){
    var query = "SELECT id, roomName, passwordRequired FROM room where id = ? ";
    var args = [];
    args.push(data.id);

    pool.query(query, args,  function(err, rs, fields){
        if(err){
            return cb(err);
        }
        cb(null, rs);
    });
}