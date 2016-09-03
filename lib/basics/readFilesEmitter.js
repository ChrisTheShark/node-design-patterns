"use strict";
const EventEmitter = require('events').EventEmitter,
      util = require('util'),
      fs = require('fs');

function FileReader() {
  EventEmitter.call(this);
}

util.inherits(FileReader, EventEmitter);

FileReader.prototype.readFiles = function (directory, callback) {
  fs.readdir(directory, (error, files) => {
    files.forEach((file) => {
      fs.readFile(file, 'utf8', (error, data) => {
        if (error) return callback(error);
        this.emit('fileRead', data);
      });
    });
    callback(null, files);
  });
}

module.exports = FileReader;
