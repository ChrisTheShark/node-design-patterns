'use strict';
const fs = require('fs'),
    split = require('split'),
    request = require('request'),
    LimitedParallelStream = require('./limitedParallelStream');

console.time('checking urls');

fs.createReadStream(process.argv[2])
    .pipe(split())
    .pipe(new LimitedParallelStream(1, function(url, encoding, callback) {
        if (!url) return callback();
        let self = this;
        request.head(url, (error, response) => {
            self.push(url + ' is ' + (error ? 'down' : 'up') + '\n');
            callback();
        });
    }))
    .pipe(fs.createWriteStream('results.txt'))
    .on('finish', () => {
        console.timeEnd('checking urls');
        console.log('All urls were checked.');
    })
