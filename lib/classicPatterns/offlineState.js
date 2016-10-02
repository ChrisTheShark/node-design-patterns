'use strict';
const jot = require('json-over-tcp');

function OfflineState(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
}
OfflineState.prototype.send = function(data) {
    this.failsafeSocket.queue.push(data);
}
OfflineState.prototype.activate = function() {
    let self = this;

    function retry() {
        setTimeout(function() {
            self.activate();
        }, 500);
    }
    self.failsafeSocket.socket = jot.connect(self.failsafeSocket.options, function() {
        self.failsafeSocket.socket.removeListener('error', retry);
        self.failsafeSocket.changeState('online');
    });
    self.failsafeSocket.socket.once('error', retry);
}

module.exports = OfflineState;
