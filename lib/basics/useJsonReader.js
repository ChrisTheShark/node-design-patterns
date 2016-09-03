"use strict";
const jsonReader = require('./jsonReader');

process.on('uncaughtException', function(error) {
  console.log('Caught error: ' + error.message);
});

console.log('Before Read!');
jsonReader.readJson('./valid.json', (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
console.log('After Read!');

console.log('Before Read!');
jsonReader.readJson('./invalid.json', (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
console.log('After Read!');

console.log('Before Read!');
jsonReader.readJson('./valid.json', (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
console.log('After Read!');
