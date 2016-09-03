"use strict";
const fs = require('fs'),
    zlib = require('zlib'),
    async = require('async'),
    filename = process.argv[2];

function processWithoutStreams(filename) {
    fs.readFile(filename, (error, buffer) => {
        zlib.gzip(buffer, (error, buffer) => {
            fs.writeFile(filename + '.gz', buffer, (error) => {
                if (error) {
                    console.error(error);
                }
                console.log('File written.');
            });
        });
    });
}

function processWithWaterfall(filename) {
    async.waterfall([
        (callback) => {
            fs.readFile(filename, (error, buffer) => {
                if (error) {
                    return callback(error);
                }
                callback(null, buffer);
            });
        },
        (buffer, callback) => {
            zlib.gzip(buffer, (error, buffer) => {
                if (error) {
                    return callback(error);
                }
                callback(null, buffer);
            });
        },
        (buffer, callback) => {
            fs.writeFile(filename + '.gz', buffer, (error) => {
                if (error) {
                    return callback(error);
                }
                callback(null, 'done');
            });
        }
    ], (error, result) => {
        if (error) {
            console.error(error);
        }
        console.log('File written.');
    });
}

function processWithStreams(filename) {
    fs.createReadStream(filename)
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream(filename + '.gz'))
        .on('finish', () => {
            console.log('File written.');
        });
}

processWithoutStreams(filename);
