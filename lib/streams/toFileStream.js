"use strict";
const stream = require('stream'),
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    mkdirp = require('mkdirp');

function ToFileStream() {
    stream.Writable.call(this, {
        objectMode: true
    });
};
util.inherits(ToFileStream, stream.Writable);

ToFileStream.prototype._write = function(chunk, encoding, callback) {
    let self = this;
    mkdirp(path.dirname(chunk.path), (error) => {
        if (error) {
            return callback(error);
        }
        fs.writeFile(chunk.path, chunk.content, callback);
    });
}

module.exports = ToFileStream;
