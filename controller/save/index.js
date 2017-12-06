var moduleName = __filename;

var express = require("express");
var fileController = require("./FileController");

var app = express();

app.use(express.static('client/save'))

app.use(fileController);

module.exports = app;