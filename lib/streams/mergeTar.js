'use strict'
const tar = require('tar'),
    fstream = require('fstream'),
    path = require('path'),
    destination = path.resolve(process.argv[2]),
    sourceA = path.resolve(process.argv[3]),
    sourceB = path.resolve(process.argv[4]);

let pack = tar.Pack();
let endCount = 0;

function onEnd() {
    if (++endCount === 2) {
        pack.end();
    }
}

pack.pipe(fstream.Writer(destination));

let sourceStreamA = fstream.Reader({
    type: 'Directory',
    path: sourceA
}).on('end', onEnd);

let sourceStreamB = fstream.Reader({
    type: 'Directory',
    path: sourceB
}).on('end', onEnd);

sourceStreamA.pipe(pack, {
    end: false
});
sourceStreamB.pipe(pack, {
    end: false
});
