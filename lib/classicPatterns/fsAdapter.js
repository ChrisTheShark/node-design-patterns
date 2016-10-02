'use strict';
const path = require('path');

function createAdapter(db) {
    return {
        readFile: function(filename, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            } else if (typeof options === 'string') {
                options = {
                    encoding: options
                };
            }
            db.get(path.resolve(filename), {
                valueEncoding: options.encoding
            }, function(error, value) {
                if (error) {
                    if (error.type === 'NotFoundError') {
                        error = new Error('ENOENT, open \'' + filename + '\'');
                        error.code = 'ENOENT';
                        error.errno = 34;
                        error.path = filename;
                    }
                    return callback && callback(error);
                }
                callback && callback(value);
            });
        },
        writeFile: function(filename, contents, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            } else if (typeof options === 'string') {
                options = {
                    encoding: options
                };
            }
            db.put(path.resolve(filename), contents, {
                valueEncoding: options.encoding
            }, callback);
        }
    };
}

module.exports = createAdapter;
