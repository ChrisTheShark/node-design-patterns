'use strict';
const net = require('net'),
    fs = require('fs');

function demultiplexChannel(source, destinations) {
    let currentChannel = null;
    let currentLength = null;
    source.on('readable', function() {
        let chunk = null;
        if (currentChannel === null) {
            chunk = this.read(1);
            currentChannel = chunk && chunk.readUInt8(0);
        }
        if (currentLength === null) {
            chunk = this.read(4);
            currentLength = chunk && chunk.readUInt32BE(0);
            if (currentLength === null) {
                return;
            }
        }
        chunk = this.read(currentLength);
        if (chunk === null) {
            return;
        }
        console.log(' Received packet from: ' + currentChannel);
        destinations[currentChannel].write(chunk);

        currentChannel = null;
        currentLength = null;
    }).on(' end', function() {
        destinations.forEach(function(destination) {
            destination.end();
        });
        console.log(' Source channel closed');
    });
}

net.createServer(function(socket) {
    let stdoutStream = fs.createWriteStream('stdout.log');
    let stderrStream = fs.createWriteStream('stderr.log');
    demultiplexChannel(socket, [stdoutStream, stderrStream]);
}).listen(3000, function() {
    console.log(' Server started');
});
