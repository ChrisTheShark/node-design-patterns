"use strict";
const thunkify = require('thunkify'),
    request = thunkify(require('request'));

function asyncFlowWithThunks(generatorFunction) {
    function callback(err) {
        if (err) {
            return generator.throw(err);
        }
        var results = [].slice.call(arguments, 1);
        var thunk = generator.next(results.length > 1 ? results : results[0]).value;
        thunk && thunk(callback);
    };
    var generator = generatorFunction();
    var thunk = generator.next().value;
    thunk && thunk(callback);
}

function* simpleGenerator() {
    let results = yield request('http://www.google.com');
    console.log(results.length);
}

asyncFlowWithThunks(simpleGenerator);
