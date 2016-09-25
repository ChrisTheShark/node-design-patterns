'use strict';

module.exports = function(db) {
    db.subscribe = function(pattern, listener) {
        db.on('put', function(key, value) {
            let match = Object.keys(pattern).every((k) => {
                return pattern[k] === value[k];
            });
            if (match) {
                listener(key, value);
            }
        });
    }
    return db;
}
