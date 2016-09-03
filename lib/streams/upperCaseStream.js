'use strict';
const stream = require('stream'),
    util = require('util');

function UpperCaseStream() {
    stream.Transform.call(this, {
        decodeStrings: false
    });
}

util.inherits(UpperCaseStream, stream.Transform);

UpperCaseStream.prototype._transform = function(data, encoding, callback) {
    this.push(data.toString().toUpperCase());
    callback();
}

module.exports = UpperCaseStream;
