var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.text());
    app.use(bodyParser.urlencoded());
    
    app.use(function(req, res, next){
        let contentType = req.headers["content-type"];

        if(/.*text.*/.test(contentType)){
            req.body = {
                content : req.body
            }
        }
        next();
    })
}