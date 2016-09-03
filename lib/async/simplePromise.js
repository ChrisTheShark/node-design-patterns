"use strict";
const fs = require('fs'),
      filename = '/Users/chris/Documents/gitprojects/node-design-patterns/lib/logger.js';

function promiseReadFile(file, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile.call(null, file, encoding, (error, data) => {
            if (error) { reject(error); }
            resolve(data);
        });
    });
}

promiseReadFile(filename, 'utf8')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });