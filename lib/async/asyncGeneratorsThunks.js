const fs = require('fs'),
    path = require('path');

function readFileThunk(filename, encoding) {
    return function(callback) {
        fs.readFile(filename, encoding, callback);
    };
}

function writeFileThunk(filename, encoding) {
    return function(callback) {
        fs.writeFile(filename, encoding, callback);
    };
}

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

asyncFlowWithThunks(function*() {
    var myself = yield readFileThunk(__filename, 'utf8');
    yield writeFileThunk(" clone of clone.js", myself);
    console.log(" Clone created");
});
