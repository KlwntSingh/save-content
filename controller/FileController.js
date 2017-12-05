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

app.get('/favicon.ico', function(req, res) {
    res.status(204);
    res.end()
});


app.get('/:id', function(req, res){
    var id = req.params.id;
    logger.info("Request came for file content for file: " + id);
    var data = {};
    data.name = id;
    fileServices.readContentOfFile(data, function(err, status, rs){
        if(err){
            logger.error(err);
            responseController(err, null, null, res);
            return err;
        }
        rs.file = true;
        rs.path = rs.path + "/" + rs.fileName
        responseController(err, status, rs, res);
    })
})

app.post('/file', fileUpload.array('file[]'),function(req, res){
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