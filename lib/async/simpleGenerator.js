"use strict";

function* simpleGenerator() {
    let name = yield 3;
    yield 'Hello ' + name + '!';
}

let generator = simpleGenerator();
console.log(generator.next().value);
console.log(generator.next('Chris').value);