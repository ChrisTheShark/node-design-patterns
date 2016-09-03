"use strict";
const FileReader = require('./readFilesEmitter'),
      fileReader = new FileReader();

fileReader.readFiles('/Users/chris/Documents/gitprojects' +
  '/node-design-patterns/lib', function(error, data) {
    if (error) console.error(error);
    console.log(data);
});

fileReader.on('fileRead', function(data) {
    console.log('fileRead: ' + data);
});
