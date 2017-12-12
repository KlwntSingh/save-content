"use strict";
global.appBasePath = __dirname;

require('app-module-path').addPath(appBasePath);

var moduleName = __filename;
var config = require("config.json");
var PORT = config.port;
PORT = PORT || 3001;
global.PORT = PORT;

var express = require('express');
var app = express();

require('./appinit');

require('middleware')(app);
app.use(require('controller'));

app.use(function(req, res){
    res.redirect('/save');
})

// starting application server
var server = app.listen(PORT);
console.log("Server Started listening on " + PORT);
