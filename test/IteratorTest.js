var assert = require('assert');
var Iterator = require('../src/Iterator');

describe('Iterator', function() {

    describe('#next()', function() {
        it('should return next value in array until #hasNext() returns false', function() {
            var a = {}, b = {}, c = {};
            var arr = [];
            arr.push(a);
            arr.push(b);
            arr.push(c);
            var it = new Iterator(arr);
            for (var i = 0; i < 3; i++) {
                assert.equal(true, it.hasNext());
                if (i === 0) {
                    assert.equal(a, it.next());
                } else if (i === 1) {
                    assert.equal(b, it.next());
                } else {
                    assert.equal(c, it.next());
                }
            }
            assert.equal(false, it.hasNext());
            assert.equal(undefined, it.next());
        });

    });

});
