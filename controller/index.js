var moduleName = __filename;

var app = require('express')();
var fileController = require("./FileController");

app.get('/favicon.ico', function(req, res) {
    res.status(204);
    res.end()
});

app.use(fileController);


module.exports = app;