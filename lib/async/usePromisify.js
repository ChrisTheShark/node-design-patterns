"use strict";
const Promise = require('bluebird'),
      promiseUtility = require('./promiseUtilities'),
      fs = require('fs'),
      files = ['/Users/chris/Documents/gitprojects/node-design-patterns/lib/useLogger.js',
               '/Users/chris/Documents/gitprojects/node-design-patterns/lib/useJsonReader.js'];

let promiseFsRead = promiseUtility.promisify(fs.readFile);
files.forEach((element) => {
    promiseFsRead(element, 'utf8')
        .then((results) => {
            console.log(results);
        });
});