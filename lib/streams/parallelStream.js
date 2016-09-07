'use strict';
const stream = require('stream'),
    util = require('util');

function ParallelStream(userTransform) {
    stream.Transform.call(this, {
        objectMode: true
    });
    this.userTransform = userTransform;
    this.terminateCallback = null;
    this.running = 0;
}
util.inherits(ParallelStream, stream.Transform);

ParallelStream.prototype._transform = function(chunk, encoding, done) {
    this.running++;
    this.userTransform(chunk, encoding, this._onComplete.bind(this));
    done();
}

ParallelStream.prototype._flush = function(done) {
    if (this.running > 0) {
        this.terminateCallback = done;
    } else {
        done();
    }
}

ParallelStream.prototype._onComplete = function(error) {
    this.running--;
    if (error) {
        return this.emit('error', error);
    }
    if (this.running === 0) {
        this.terminateCallback && this.terminateCallback();
    }
}

module.exports = ParallelStream;
