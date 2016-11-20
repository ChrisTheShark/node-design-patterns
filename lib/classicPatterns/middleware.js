'use strict';

module.exports.json = function() {
    return {
        inbound: function(message, next) {
            console.log('INBOUND TO JSON');
            message.data = JSON.parse(message.data.toString());
            next();
        },
        outbound: function(message, next) {
            console.log('OUTBOUND FROM JSON');
            message.data = new Buffer(JSON.stringify(message.data));
            next();
        }
    }
}
