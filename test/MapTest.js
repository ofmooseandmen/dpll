var assert = require('assert');
var Map = require('../src/Map');

describe('Map', function() {

    describe('#get(key)', function() {
        it('should return associated value if key is known', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var value = {
                name : 'firstValue'
            };
            map.put(key, value);
            assert.equal(value.name, map.get(key).name);
        });

        it('should return associated value if key is known (equals)', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var value = {
                name : 'firstValue'
            };
            var sameKey = {
                name : 'first',
                equals : function(other) {
                    return this.name === other.name;
                }

            };
            map.put(key, value);
            assert.equal(value.name, map.get(sameKey).name);
        });
    });

    describe('#remove(key)', function() {

        it('should return associated value if key is known and remove the entry', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var value = {
                name : 'firstValue'
            };
            map.put(key, value);
            assert.equal(value.name, map.remove(key).name);
            assert.equal(undefined, map.get(key));
        });

        it('should return undefined value if key is unknown', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var value = {
                name : 'firstValue'
            };
            var unknown = {
                name : 'unknown'
            };
            map.put(key, value);
            assert.equal(undefined, map.remove(unknown));

        });

        it('should return associated value if key is known and remove the entry (equals)', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var value = {
                name : 'firstValue'
            };
            var sameKey = {
                name : 'first',
                equals : function(other) {
                    return this.name === other.name;
                }

            };
            map.put(key, value);
            assert.equal(value.name, map.remove(sameKey).name);
            assert.equal(undefined, map.get(sameKey));
        });

    });

    describe('#push(key, value)', function() {
        it('should replace the previous value associated with the key and return it.', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var value = {
                name : 'firstValue'
            };
            var newValue = {
                name : 'newValue'
            };
            map.put(key, value);
            assert.equal(value.name, map.put(key, newValue).name);
        });

        it('should associate the value to the key and return undefined.', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var value = {
                name : 'firstValue'
            };
            assert.equal(undefined, map.put(key, value));
        });

        it('should replace the previous value associated with the key and return it (equals).', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var sameKey = {
                name : 'first',
                equals : function(other) {
                    return this.name === other.name;
                }

            };
            var value = {
                name : 'firstValue'
            };
            var newValue = {
                name : 'newValue'
            };
            map.put(key, value);
            assert.equal(value.name, map.put(sameKey, newValue).name);
        });

    });

    describe('#isEmpty()', function() {
        it('should return true before any call to put or after one push/remove.', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var value = {
                name : 'firstValue'
            };
            assert.equal(map.isEmpty(), true, 'expected value is true');
            map.put(key, value);
            map.remove(key);
            assert.equal(true, map.isEmpty());
            assert.equal(0, map.size());
        });

        it('should return false after call to put.', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var value = {
                name : 'firstValue'
            };
            map.put(key, value);
            assert.equal(false, map.isEmpty());
            assert.equal(1, map.size());
        });
    });

    describe('#keyArray()', function() {
        it('should return an array with 2 elements.', function() {
            var map = new Map();
            var a = {};
            var b = {};
            map.put(a, {});
            map.put(b, {});
            var keyArray = map.keyArray();
            assert.equal(2, keyArray.length);
            assert.equal(true, a === keyArray[0]);
            assert.equal(true, b === keyArray[1]);
        });
    });

    describe('#entries()', function() {
        it('should return an array with 2 elements.', function() {
            var map = new Map();
            var key1 = {};
            var key2 = {};
            var val1 = {};
            var val2 = {};
            map.put(key1, val1);
            map.put(key2, val2);
            var entries = map.entries();
            assert.equal(2, entries.length);
            assert.equal(true, key1 === entries[0].key);
            assert.equal(true, val1 === entries[0].value);
            assert.equal(true, key2 === entries[1].key);
            assert.equal(true, val2 === entries[1].value);
        });
    });

});
