'use strict';
const expect = require('chai').expect,
    level = require('level'),
    levelSubscribe = require('../lib/classicPatterns/levelSubscribe');

describe('levelSubscribe', function() {
    it('should augment a db object with a pattern listener', function(done) {
        let db = levelSubscribe(level(__dirname + '/db', {
            valueEncoding: 'json'
        }));

        db.subscribe({
            doctype: 'tweet',
            language: 'en'
        }, function(key, value) {
            expect(value.doctype).to.equal('tweet');
            expect(value.language).to.equal('en');
            done();
        });

        db.put(' 1', {
            doctype: 'tweet',
            text: 'Hi',
            language: 'en'
        });
    });
});
