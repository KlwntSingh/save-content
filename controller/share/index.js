var moduleName = __filename;

var express = require("express");
var shareController = require("./RoomController");
var roomContentController = require("./RoomContentController");
var authorizationMiddleware = require("middleware/cookie");

var app = express();

app.use("/dist", express.static('client/share/dist'))

app.use("/room/content", authorizationMiddleware.getCookie, roomContentController);
app.use("/room", shareController);

module.exports = app;