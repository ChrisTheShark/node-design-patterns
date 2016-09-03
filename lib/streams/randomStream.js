"use strict";

const stream = require('stream'),
    util = require('util'),
    chance = require('chance').Chance();

function RandomStream(options) {
    stream.Readable.call(this, options);
}

util.inherits(RandomStream, stream.Readable);

RandomStream.prototype._read = function(size) {
    this.push(chance.string(), 'utf8');
    if (chance.bool({
            likelihood: 5
        })) {
        this.push(null);
    }
}

module.exports = RandomStream;
