var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.text());
}