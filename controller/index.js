var moduleName = __filename;

var app = require('express')();
var fs = require('fs');
var fileServices = require('services/FileServices.js');
var responseController = require('./ResponseController');
var fileUpload = require("middleware/FileHandler.js");
var serviceStatusCodes = require('constants/ServiceStatusCodes.js');
var logger = require('services/CoreServices/Logger')(moduleName);

app.get('/list', function(req, res){
    logger.info("Request came for file listing");
    fileServices.listFiles(function(err, status, data){
        responseController(err, status, data, res);
    })
})

app.post('/file', fileUpload.array('file[]'),function(req, res){
    logger.info("Request came for uploading file");
    responseController(null, serviceStatusCodes.SUCCESS, {message : "success"}, res);
})

app.post('/', function(req, res){
    logger.info("Request came for uploading content");
    var body = {};
    body.content = req.body.content;
    body.name = req.body.name;
    fileServices.saveText(body, function(err, status, data){
        responseController(err, status, data, res);
    })
})


module.exports = app;