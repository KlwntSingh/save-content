"use strict";


var customLogger = function (moduleName) {
    this.moduleName = moduleName;
    var self = this;
    for (var i in fileLogger) {
        if (fileLogger.hasOwnProperty(i)) {
            (function (i) {
                self[i] = function () {
                    arguments[arguments.length] = moduleName;
                    arguments.length += 1;
                    fileLogger[i].apply(fileLogger, arguments);
                };
            })(i);
        }
    }
    self.alert = function () {
        arguments[arguments.length] = moduleName;
        arguments.length += 1;
        emailLogger.apply(self, arguments);
    }
};

module.exports = function (moduleName) {
    return new customLogger(moduleName);
}
var fileLogger = require('./FileLogger');
var emailLogger = require('./EmailLogger');
