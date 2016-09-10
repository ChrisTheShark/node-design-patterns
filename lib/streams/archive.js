'use strict';
const fs = require('fs'),
    archiveStream = require('./combinedSecureStream'),
    multipipe = require('multipipe');

multipipe(
    fs.createReadStream(process.argv[3]),
    archiveStream.compressAndEncrypt(process.argv[2]),
    fs.createWriteStream(process.argv[3] + '.gz.aes')
).on('error', (error) => {
    console.log(error);
});
