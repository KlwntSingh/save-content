var moduleName = __filename;

var app = require('express')();
var fs = require('fs');
var roomContentServices = require('services/share/RoomContentService.js');
var responseController = require('controller/ResponseController');
var fileUpload = require("middleware/share/FileHandler.js");
var serviceStatusCodes = require('constants/ServiceStatusCodes.js');
var logger = require('services/CoreServices/Logger')(moduleName);
var authorizationMiddleware = require("middleware/cookie.js");

app.get('/files', function(req, res){
    console.log(req.locals);
    logger.info("Request came for room content listing");
    roomContentServices.listContent(req.locals, function(err, status, data){
        responseController(err, status, data, res);
    })
})

app.post('/file', fileUpload.single('file'),function(req, res){
    logger.info("Request came for uploading file");
    responseController(null, serviceStatusCodes.SUCCESS, {message : "success"}, res);
})

app.post('/text', function(req, res){
    logger.info("Request came for uploading content");
    var body = {};
    body.content = req.body.content;
    body.name = req.body.name;
    fileServices.saveText(body, function(err, status, data){
        responseController(err, status, data, res);
    })
})


module.exports = app;