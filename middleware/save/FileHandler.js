var fileUpload = require("services/CoreServices/FileUploadService.js");
var config = require("config.json");
var uploadFileDirectory = config.saveDir;
var fileUtils = require('utils/FileUtilities.js');

module.exports = fileUpload(function(){
    return uploadFileDirectory;
}, function(file){
    return fileUtils.getDateAsName(file.originalname, file.mimetype);
});