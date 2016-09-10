'use strict';
const zlib = require('zlib'),
    crypto = require('crypto'),
    multipipe = require('multipipe'),
    fs = require('fs');

module.exports.compressAndEncrypt = function(password) {
    return multipipe(
        zlib.createGzip(),
        crypto.createCipher('aes192', password)
    );
}

module.exports.decryptAndDecompress = function(password) {
    return multipipe(
        crypto.createDecipher('aes192', password),
        zlib.createGunzip()
    );
}
