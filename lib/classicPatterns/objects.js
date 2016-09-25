'use strict';

let object = new Object();

object.name = 'Chris';
object.work = function() {
    return 'working...';
}

console.log(object);
console.log(Object.getPrototypeOf(object));
console.log(object.toString());

function MyObject(name) {
    this.name = name;
}

MyObject.prototype.work = function() {
    return 'working...';
}

MyObject.prototype.toString = function() {
    return 'name: ' + this.name + ' work: ' + this.work();
}

let myObject = new MyObject('Chris');

console.log(myObject);
console.log(Object.getPrototypeOf(myObject));
console.log(myObject.toString());
