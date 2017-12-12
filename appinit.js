var fsmkdir = require('mkdirp');
var config = require('config.json');

fsmkdir.sync(config.saveDir);
fsmkdir.sync(config.shareDir);