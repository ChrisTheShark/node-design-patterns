const fs = require('fs'),
    path = require('path');

function asyncFlow(generatorFunction) {
    function callback(err) {
        if (err) {
            return generator.throw(err);
        }
        var results = [].slice.call(arguments, 1);
        generator.next(results.length > 1 ? results : results[0]);
    };
    var generator = generatorFunction(callback);
    console.log(generator.next());
}

asyncFlow(function*(callback) {
    var fileName = path.basename(__filename);
    var myself = yield fs.readFile(fileName, 'utf8', callback);
    yield fs.writeFile(' clone_of_' + fileName, myself, callback);
    console.log('Clone created');
});
