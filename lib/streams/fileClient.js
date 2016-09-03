"use strict";
const http = require('http'),
    fs = require('fs'),
    zlib = require('zlib'),
    path = require('path'),
    file = process.argv[2],
    server = process.argv[3];

let options = {
    server: server,
    port: 3000,
    path: '/',
    method: 'PUT',
    headers: {
        filename: path.basename(file),
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip'
    }
};

let req = http.request(options, (res) => {
    console.log('Server response: ' + res.statusCode);
});

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(req)
    .on('finish', () => {
        console.log('File successfully sent.');
    })
