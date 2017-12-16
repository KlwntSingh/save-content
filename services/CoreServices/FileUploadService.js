/**
 * 
 */
var multer  = require('multer');

module.exports = function(uploadFileDirectoryFn, fn){
	console.log(fn);
	let storage = multer.diskStorage({
		destination : function(req, file, cb){
			console.log("destination");
			return cb(null, uploadFileDirectoryFn(req, file));
		},filename : function(req, file, cb){
			return cb(null, fn(file));
		}
	});
	
	return multer({storage : storage});
};