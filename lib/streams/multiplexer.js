'use strict';
const child_process = require('child_process'),
    net = require('net'),
    path = require('path');

function multiplexChannels(sources, destination) {
    let totalChannels = sources.length;
    sources.forEach((source, index) => {
        source.on('readable', function() {
            let chunk = null;
            while ((chunk = this.read()) !== null) {
                let outgoing = new Buffer(1 + 4 + chunk.length);
                outgoing.writeUInt8(index, 0);
                outgoing.writeUInt32BE(chunk.length, 1);
                chunk.copy(outgoing, 5);

                console.log('Sending packet to channel ' + index);
                destination.write(outgoing);
            }
        }).on('end', function() {
            if (--totalChannels === 0) {
                destination.end();
            }
        });
    });
}

let socket = net.connect(3000, () => {
    let child = child_process.fork(
        process.argv[2],
        process.argv.slice(3), {
            silent: true
        }
    );
    multiplexChannels([child.stdout, child.stderr], socket);
});
