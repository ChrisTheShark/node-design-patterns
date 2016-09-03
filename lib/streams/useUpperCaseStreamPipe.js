'use strict';
const UpperCaseStream = require('./upperCaseStream');

process.stdin.pipe(new UpperCaseStream()).pipe(process.stdout);
