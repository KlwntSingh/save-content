var serviceStatusCodes = require('constants/ServiceStatusCodes.js');

module.exports = function(err, status, data, res){
    res.status(status);
    
    if(err || status != serviceStatusCodes.SUCCESS){
        res.send(err);
    }else{
        res.send(data);
    }
}