'use strict';
const Config = require('./config'),
    strategies = require('./strategies');

let config = new Config(strategies.json);
config.set('database.url', 'msyql://172.23.34.23:45353/mydb');

console.log(config.get('database.url'));

config.save('config.json');

console.log(config.read('config.json'));
