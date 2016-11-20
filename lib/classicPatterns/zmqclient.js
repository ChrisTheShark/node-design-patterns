'use strict';
const zmq = require('zmq'),
    ZmqMiddlewareManager = require('./zmqMiddlewareManager'),
    middleware = require('./middleware'),
    request = zmq.socket('req');

request.connect('tcp://127.0.0.1:5000');

let zmqm = new ZmqMiddlewareManager(request);
zmqm.use(middleware.json());

zmqm.use({
    inbound: function(message, next) {
        console.log('Echoed back: ', message.data);
        next();
    }
});

setInterval(function() {
    console.log('SENDING>');
    zmqm.send({
        action: 'ping',
        echo: Date.now()
    });
}, 1000);
