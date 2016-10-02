'use strict';

function OnlineState(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
}
OnlineState.prototype.send = function(data) {
    this.failsafeSocket.socket.write(data);
}
OnlineState.prototype.activate = function() {
    let self = this;
    self.failsafeSocket.queue.forEach(function(data) {
        self.failsafeSocket.socket.write(data);
    });
    self.failsafeSocket.queue = [];
    self.failsafeSocket.socket.once('error', function() {
        self.failsafeSocket.changeState('offline');
    });
}
module.exports = OnlineState;
