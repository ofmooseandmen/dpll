//
// An object that maps keys to values.
// A map cannot contain duplicate keys; each key can map to at most one value.
//
// API is based on java Map interface and most of the documentation actually
// comes from the `Map.java` javadoc.
//
// This is **NOT** a HashMap since the determination of whether the map contains
// a specified key relies:
//
// - `key.equals(otherKey)` if key implements the equal function
// - `key === otherKey` otherwise
//
// The methods `put`, `get`, `containsKey` and `remove` rely on this logic.
//
// ## More about...
//
// - Collections : [Collections.js](./Collections.html)
//
// - Iterator: [Iterator.js](./Iterator.html)
//
// - Set: [Set.js](./Set.html)
//
// ## Source code
//
// import Collections.js
var Collections = require('./Collections');

// import Iterator.js
var Iterator = require('./Iterator');

// import Set.js
var Set = require('./Set');

//
// Constructor - no argument.
//
function Map() {

    'use strict';

    // the `array` in which all keys are stored.
    var keys = [];

    // the `array` in which all values are stored.
    var values = [];

    //
    // Associates the specified value with the specified key in this map. If the map previously
    // contained a mapping for the key, the old value is replaced by the specified value.
    // Returns the previous value associated with key, or `undefined` if there was no mapping for key.
    //
    this.put = function(key, value) {
        var keyIndex = Collections.indexOf(key, keys);
        var result = undefined;
        if (keyIndex === -1) {
            keys.push(key);
            values.push(value);
        } else {
            result = values[keyIndex];
            values[keyIndex] = value;
        }
        return result;
    };

    //
    // Returns the value to which the specified key is mapped, or `undefined` if this map
    // contains no mapping for the key.
    //
    this.get = function(key) {
        var keyIndex = Collections.indexOf(key, keys);
        var result = undefined;
        if (keyIndex !== -1) {
            result = values[keyIndex];
        }
        return result;
    };

    //
    // Returns `true` if this map contains the specified key.
    this.containsKey = function(key) {
        return Collections.indexOf(key, keys) !== -1;
    };

    //
    // Removes the mapping for the specified key from this map if it is present.
    // Return the previous value value associated with the specified key, or `undefined` if there was no mapping for
    // key
    //
    this.remove = function(key) {
        var keyIndex = Collections.indexOf(key, keys);
        var result = undefined;
        if (keyIndex !== -1) {
            keys.splice(keyIndex, 1);
            var res = values.splice(keyIndex, 1);
            result = res[0];
        }
        return result;
    };

    //
    // Returns `true` if this map contains no key-value mappings.
    //
    this.isEmpty = function() {
        return keys.length === 0;
    };

    //
    // Returns the number of key-value mappings in this map.
    //
    this.size = function() {
        return keys.length;
    };

    //
    // Returns a `Set` view of the keys contained in this map .
    //
    this.keySet = function() {
        var result = new Set();
        result.addAll(keys);
        return result;
    };

    //
    // Returns an array of `object` containing all the entries of this map.
    // Each object has 2 properties:
    //
    // - key: the entry key
    // - value: the entry value
    //
    this.entries = function() {
        var result = [];
        var keysLength = keys.length;
        for (var index = 0; index < keysLength; index++) {
            var entry = {
                key : keys[index],
                value : values[index]
            };
            result.push(entry);
        }
        return result;
    };

    //
    // Returns an iterator over the entries of this map.
    //
    this.iterator = function() {
        return new Iterator(this.entries());
    };
    
    //
    // Copies all of the mappings from the specified map to this map
    //
    this.putAll = function(other) {
    	var entries = other.entries();
    	var length = entries.length;
    	for (var index = 0; index < length; index++) {
    		var entry = entries[index];
    		this.put(entry.key, entry.value);
    	}
    };

}

// expose API to Node.js
module.exports = Map;
