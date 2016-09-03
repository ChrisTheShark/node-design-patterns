"use strict";
const http = require('http'),
    zlib = require('zlib'),
    fs = require('fs');

let server = http.createServer((req, res) => {
    req.pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(req.headers.filename))
        .on('finish', () => {
            console.log('File recieved ' + req.headers.filename);
            res.writeHead(201, {
                'Content-Type': 'text/plain'
            });
            res.end('File recieved.');
        })
});

server.listen(3000, (error) => {
    if (error) {
        console.error(error);
    }
})
