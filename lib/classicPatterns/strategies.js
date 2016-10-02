'use strict';

module.exports.json = {
    deserialize: function(data) {
        return JSON.parse(data);
    },
    serialize: function(data) {
        return JSON.stringify(data);
    }
}
