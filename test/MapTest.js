var assert = require("assert");
var Map = require("../src/Map.js");

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
        it('should return true before any call to push or after one push/remove.', function() {
            var map = new Map();
            var key = {
                name : 'first'
            };
            var value = {
                name : 'firstValue'
            };
            assert.equal(map.isEmpty(), true, "expected value is true");
            map.put(key, value);
            map.remove(key);
            assert.equal(true, map.isEmpty());
            assert.equal(0, map.size());
        });

        it('should return false after call to push.', function() {
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

});
