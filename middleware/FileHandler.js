/**
 * 
 */
var multer  = require('multer');

var config = require("config.json");
var uploadFileDirectory = config.contentDir;
var fileUtils = require('utils/FileUtilities.js');

var storage = multer.diskStorage({
	destination : function(req, file, cb){
		return cb(null, uploadFileDirectory);
	},filename : function(req, file, cb){
		return cb(null, fileUtils.getDateAsName(file.originalname, file.mimetype));
	}
});

var upload = multer({storage : storage});

module.exports = upload;