"use strict";
const Promise = require('bluebird');

module.exports.promisify = function(callbackBasedApi) {
    return function promisified() {
        let args = [].slice.call(arguments);
        return new Promise((resolve, reject) => {
            args.push((error, result) => {
                if (error) { return reject(error); }
                if (arguments.length <= 2) {
                    resolve(result);
                } else {
                    resolve([].slice.call(arguments, 1));
                }
            });
            callbackBasedApi.apply(null, args);
        });
    };
};