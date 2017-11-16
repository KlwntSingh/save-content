var app = require('express')();
var fs = require('fs');
var fileServices = require('services/FileServices.js');
var responseController = require('./ResponseController');

app.get('/list', function(req, res){
    fileServices.listFiles(function(err, status, data){
        responseController(err, status, data, res);
    })
})

app.post('/', function(req, res){
    var body = {};
    body.content = req.body;
    // body.name = req.body.recommendedName;
    console.log(req.body);
    fileServices.saveText(body, function(err, status, data){
        responseController(err, status, data, res);
    })
})

module.exports = app;