'use strict';
const fs = require('fs'),
    archiveStream = require('./combinedSecureStream'),
    multipipe = require('multipipe'),
    path = require('path');

multipipe(
    fs.createReadStream(process.argv[3]),
    archiveStream.decryptAndDecompress(process.argv[2]),
    fs.createWriteStream(path.basename(process.argv[3], '.gz.aes'))
).on('error', (error) => {
    console.log(error);
});
