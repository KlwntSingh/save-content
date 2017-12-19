var moduleName = __filename;
var config = require('config.json');
var jwt = require('jsonwebtoken');
var sessionSecret = config.tokenSecret;
var logger = require('services/CoreServices/Logger')(moduleName);

module.exports.setCookie = function(req, res, next){
    var data = JSON.parse(JSON.stringify(res.locals.data));
    console.log(data);
    var token = jwt.sign(data, sessionSecret,{ algorithm: 'HS512', expiresIn: '1h'}, function(err, token){
        if(err){
            logger.error(err);
            logger.alert(err);
            return next(err);
        }
        res.setHeader("authorization", token);
        next();
    });
}

module.exports.getCookie = function(req, res, next){
    let authorization = req.headers.authorization || "Session " + req.query.token;

    if(authorization){
        let arr = authorization.split(" ");
        if(arr[0] == "Session"){
            let token = arr[1];
            jwt.verify(token, sessionSecret, function(err, data){
                if(!err){
                    req.locals = data;
                    return next();
                }
                res.status(401);
                res.send({message : "Authentication required"})
            });
        }else{
            res.status(401);
            res.send({message : "Authentication required"})
        } 
    }else{
        res.status(401);
        res.send({message : "Authentication required"})
    }

}