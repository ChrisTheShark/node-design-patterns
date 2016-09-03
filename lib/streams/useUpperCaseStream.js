'use strict';
const UpperCaseStream = require('./upperCaseStream');

let upperCaseStream = new UpperCaseStream();
let upperCaseString = '';

upperCaseStream.on('data', (chunk) => {
    upperCaseString += chunk;
});

upperCaseStream.on('end', () => {
    console.log(upperCaseString);
});

upperCaseStream.write('Hello ');
upperCaseStream.write('World!');
upperCaseStream.end();
