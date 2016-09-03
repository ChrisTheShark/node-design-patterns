"use strict";
const request = require('request'),
    fs = require('fs');

function asyncGenerator(generatorFunction) {
    function callback(error, response, body) {
        if (error) {
            generator.throw(error);
        }
        generator.next(body);
    }
    let generator = generatorFunction('http://www.google.com', callback);
    generator.next();
}

function* writeHtmlToFile(url, callback) {
    let body = yield request.get(url, callback);
    yield fs.writeFile(__dirname + '/url.html', body, callback);
}

asyncGenerator(writeHtmlToFile);
