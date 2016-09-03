"use strict";
const fileReader = require('./readFiles');

fileReader.readFiles('/Users/chris/Documents/gitprojects' +
  '/node-design-patterns/lib', function(error, data) {
    if (error) console.error(error);
    console.log(data);
  }).on('fileRead', function(data) {
    console.log('fileRead: ' + data);
  });
