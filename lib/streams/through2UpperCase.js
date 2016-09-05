'use strict';
const through2 = require('through2'),
    fs = require('fs');

/*
 * through2 with anonomous function. 'this' is defined as
 * expected.
 */
fs.createReadStream('fakefile.txt')
    .pipe(through2(function(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }))
    .pipe(process.stdout);

/*
 * through2 with arrow function. 'this' is not defined as
 * expected. This syntax requires us to use the callback and
 * bypass the call to 'this.push()'.
 */
fs.createReadStream('fakefile.txt')
    .pipe(through2((chunk, encoding, callback) => {
        callback(null, chunk.toString().toUpperCase());
    }))
    .pipe(process.stdout);
