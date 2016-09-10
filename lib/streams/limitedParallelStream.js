'use strict';
const stream = require('stream'),
    util = require('util');

function LimitedParallelStream(concurrency, userTransform) {
    stream.Transform.call(this, {
        objectMode: true
    });
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
    this.continueCallback = null;
    this.concurrency = concurrency;
}

util.inherits(LimitedParallelStream, stream.Transform);

LimitedParallelStream.prototype._transform = function(chunk, enc, done) {
    this.running++;
    this.userTransform(chunk, enc, this._onComplete.bind(this));
    if (this.running < this.concurrency) {
        done();
    } else {
        this.continueCallback = done;
    }
}

LimitedParallelStream.prototype._flush = function(done) {
    if (this.running > 0) {
        this.terminateCallback = done;
    } else {
        done();
    }
}

LimitedParallelStream.prototype._onComplete = function(error, chunk) {
    this.running--;
    if (error) {
        return this.emit('error', error);
    }

    let tmpCallback = this.continueCallback;
    this.continueCallback = null;
    tmpCallback && tmpCallback();

    if (this.running === 0) {
        this.terminateCallback && this.terminateCallback();
    }
}

module.exports = LimitedParallelStream;
