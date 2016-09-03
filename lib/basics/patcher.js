"use strict";
const logger = require('./logger');

logger.customLog = function(message) {
  console.log('[' + this.name + ': custom] ' + message);
}
