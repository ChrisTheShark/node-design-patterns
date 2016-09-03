"use strict";
const TaskQueue = require('./taskQueue'),
    thunkify = require('thunkify'),
    readFile = thunkify(require('fs').readFile);

let taskQueue = new TaskQueue(3);

taskQueue.pushTask(function*() {
    return yield readFile('/Users/chris/Documents/gitprojects/node-design-patterns/lib/a.js', 'utf8');
});
