"use strict";

function* generator(iteratee) {
    for(let i = 0; i < iteratee.length; i++) {
        yield iteratee[i];
    }
}

let fruits = ['apple', 'orange', 'pear', 'pineapple'];

let simpleIterator = generator(fruits);

let element = simpleIterator.next();
while (!element.done) {
    console.log(element.value);
    element = simpleIterator.next();
}