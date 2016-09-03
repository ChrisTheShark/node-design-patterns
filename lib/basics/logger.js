"use strict";
function Logger(name) {
  this.name = name;
};
Logger.prototype.info = function(message) {
  console.log('[' + this.name + ': info] ' + message);
}
Logger.prototype.warn = function(message) {
  console.log('[' + this.name + ': warning] ' + message);
}

module.exports = new Logger('SimpleLogger');
module.exports.Logger = Logger;
