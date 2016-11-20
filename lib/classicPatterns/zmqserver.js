'use strict';
const zmq = require('zmq'),
    ZmqMiddlewareManager = require('./zmqMiddlewareManager'),
    middleware = require('./middleware'),
    reply = zmq.socket('rep');

reply.bind('tcp://127.0.0.1:5000');

let zmqm = new ZmqMiddlewareManager(reply);
zmqm.use(middleware.json());

zmqm.use({
    inbound: function(message, next) {
        console.log('Received: ', message.data);
        if (message.data.action === 'ping') {
            console.log('SENDING RESPONSE');
            this.send({
                action: 'pong',
                echo: message.data.echo
            });
        }
        next();
    }
});
