var moduleName = __filename;

var express = require("express");
var shareController = require("./ShareController");

var app = express();

app.use(express.static('client/share'))

app.use(shareController);

module.exports = app;