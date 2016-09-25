'use strict';

function decorateObject(objectToDecorate) {
    let proto = Object.getPrototypeOf(objectToDecorate);

    function Decorator(objectToDecorate) {
        this.objectToDecorate = objectToDecorate;
    }

    Decorator.prototype = Object.create(proto);
    Decorator.prototype.augmentedMethod = function(greeting) {
        objectToDecorate.sayGreeting(greeting + " more stuff.");
    }
    Decorator.prototype.delegatedMethod = function() {
        objectToDecorate.sayGoobye.apply(this, arguments);
    }
    Decorator.prototype.addedMethod = function() {
        console.log('Heyyy!');
    }

    return new Decorator(objectToDecorate);
}

let someObject = {
    sayGreeting: function(greeting) {
        console.log(greeting);
    },
    sayGoobye: function() {
        console.log("Good Bye!");
    }
}

let decoratedObject = decorateObject(someObject);
someObject.sayGreeting('Hello');
decoratedObject.augmentedMethod('Hello');
someObject.sayGoobye();
decoratedObject.delegatedMethod();
decoratedObject.addedMethod();

module.exports = decorateObject;
