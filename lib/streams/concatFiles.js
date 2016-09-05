'use strict';
const from = require('from2-array'),
    through = require('through2'),
    fs = require('fs');

function concatFiles(destination, files, callback) {
    let destStream = fs.createWriteStream(destination);
    console.log(files);
    from.obj(files)
        .pipe(through.obj((file, encoding, done) => {
            console.log(file);
            let readStream = fs.createReadStream(file);
            readStream.pipe(destStream, {
                end: false
            });
            readStream.on('end', () => {
                done();
            })
        }))
        .on('finish', () => {
            destStream.end();
            callback();
        })
}

concatFiles('allTogether.txt', ['fakeFile.txt', 'fakeFile2.txt'], () => {
    console.log('All done!');
})

module.exports = concatFiles;
