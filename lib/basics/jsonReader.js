"use strict";
const fs = require('fs');

function readJson(filename, callback) {
  fs.readFile(filename, 'utf8', (error, data) => {
    try {
      let json = JSON.parse(data);
      callback(null, json);
    } catch (error) {
      callback(error, null);
    }
  });
}

module.exports.readJson = readJson;
