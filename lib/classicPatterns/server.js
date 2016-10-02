'use strict';
const jot = require('json-over-tcp'),
    server = jot.createServer();

server.on('connection', function(socket) {
    socket.on('data', function(data) {
        console.log('Client data', data);
    });
});
server.listen(5000, function() {
    console.log('Started')
});
