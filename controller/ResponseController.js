var serviceStatusCodes = require('constants/ServiceStatusCodes.js');

module.exports = function(err, status, data, res){
    res.status(status);
    
    if(err || status != serviceStatusCodes.SUCCESS){
        res.send(err);
    }else{
        if(data.file){
           return res.download(data.path, data.fileName); 
        }
        res.send(data);
        res.end();
    }
}