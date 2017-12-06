var moduleName = __filename;

var app = require('express')();
var fileController = require("./save/");
var shareController = require("./share/");

app.get('/favicon.ico', function(req, res) {
    res.status(204);
    res.end()
});

app.use("/save", fileController);
app.use("/share", shareController);

module.exports = app;