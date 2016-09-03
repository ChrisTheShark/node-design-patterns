"use strict";
const EventEmitter = require('events').EventEmitter,
      fs = require('fs');

function readFiles(directory, callback) {
    let emitter = new EventEmitter();
    fs.readdir(directory, (error, files) => {
      files.forEach((file) => {
        fs.readFile(file, 'utf8', (error, data) => {
          if (error) return callback(error);
          emitter.emit('fileRead', data);
        });
      });
      callback(null, files);
    });
    return emitter;
}

module.exports.readFiles = readFiles;
