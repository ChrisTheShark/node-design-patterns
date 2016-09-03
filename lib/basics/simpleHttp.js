"use strict";
const http = require('http');

http.get('http://www.google.com', (res) => {
    let response = '';
    res.on('data', (data) => {
        response += data;
    });
    res.on('end', () => {
        console.log(response);
    });
});
