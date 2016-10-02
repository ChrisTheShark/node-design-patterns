'use strict';
const createFailsafeSocket = require('./failsafeSocket'),
    failsafeSocket = createFailsafeSocket({
        port: 5000
    });

setInterval(function() {
    failsafeSocket.send(process.memoryUsage());
}, 1000);
