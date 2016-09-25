'use strict';
const expect = require('chai').expect,
    Profiler = require('../lib/classicPatterns/profiler');

describe('profiler', function() {
    it('should return an interval if NODE_ENV === development', function() {
        process.env.NODE_ENV = 'development';
        let profiler = Profiler('test profiler');
        profiler.start();
        expect(profiler.end()).to.contain('Timer "test profiler" took');
    });
    it('should return nothing if NODE_ENV === production', function() {
        process.env.NODE_ENV = 'production';
        let profiler = Profiler('test profiler');
        profiler.start();
        expect(profiler.end()).to.be.undefined;
    });
});
