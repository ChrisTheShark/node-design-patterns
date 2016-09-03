'use strict';
const ToFileStream = require('./toFileStream');

let tfs = new ToFileStream();
tfs.write({
    path: "file1.txt",
    content: "Hello"
});
tfs.end(() => {
    console.log(" All files created");
});
