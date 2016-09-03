"use strict";
const patch = require('./patcher'),
      logger = require('./logger');

logger.info('this is a default log statement.');
logger.customLog('this is a custom log statement.');

let mylogger = new logger.Logger('CustomLogger');

mylogger.info('this is an informative message.')
mylogger.warn('this is a warning message.')
