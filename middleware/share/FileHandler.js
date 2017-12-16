var fileUpload = require("services/CoreServices/FileUploadService.js");
var config = require("config.json");
var uploadFileDirectory = config.shareDir;
var fileUtils = require('utils/FileUtilities.js');


module.exports = fileUpload(function(req, file){
    let roomName = req.locals.roomName;
    let roomPath = uploadFileDirectory + "/" + roomName;
    console.log(roomPath);
    return roomPath;
}, function(file){
    console.log(file);
    return fileUtils.getDateAsName(file.originalname, file.mimetype);
});
