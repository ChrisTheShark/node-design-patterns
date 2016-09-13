'use strict';
const fs = require('fs'),
    crypto = require('crypto');

let md5Stream = crypto.createHash('md5');
md5Stream.setEncoding('base64');
let sha1Stream = crypto.createHash('sha1');
sha1Stream.setEncoding('base64');

let inputFile = process.argv[2];
let inputStream = fs.createReadStream(inputFile);

inputStream.pipe(md5Stream)
    .pipe(fs.createWriteStream(inputFile + '.md5'));
inputStream.pipe(sha1Stream)
    .pipe(fs.createWriteStream(inputFile + '.sha1'));
