var moduleName = __filename;

var app = require('express')();
var fs = require('fs');
var roomServices = require('services/share/RoomService.js');
var responseController = require('controller/ResponseController');
var fileUpload = require("middleware/FileHandler.js");
var serviceStatusCodes = require('constants/ServiceStatusCodes.js');
var logger = require('services/CoreServices/Logger')(moduleName);
var authorizationMiddleware = require("middleware/cookie.js");

app.get('/list', function(req, res){
    logger.info("Request came for room listing");
    roomServices.list(function(err, status, data){
        responseController(err, status, data, res);
    })
})

app.post('/validate', function(req, res, next){
    logger.info("Request came for room by roomname");
    let data = req.body;
    roomServices.findOrCreateRoomByName(data, function(err, status, rs){
        res.locals = {
            error : err, status, data: rs  
        };
        next();
    })
},  function(req, res, next){
        if(res.locals.status == 200 || res.locals.status == 201){
            console.log("cookie set");
            authorizationMiddleware.setCookie(req, res, next);
        }else{
            next();
        }
    },  function(req, res){
    responseController(res.locals.error, res.locals.status, res.locals.data, res);
})

app.delete('/', authorizationMiddleware.getCookie, function(req, res, next){
    logger.info("Request came for room by roomname");
    let data = req.locals;
    console.log(data);
    roomServices.deleteRoom(data, function(err, status, rs){
        responseController(err, status, rs, res);
    })
})


module.exports = app;