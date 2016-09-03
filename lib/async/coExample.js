"use strict";
const co = require('co');

co(function*() {
    return yield Promise.resolve(true);
}).then((value) => {
    console.log(value);
}, (error) => {
    console.error(error.stack);
})
