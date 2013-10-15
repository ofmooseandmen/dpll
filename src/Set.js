//
// A collection that contain no duplicate element
//
// API is based on java Set interface and most of the documentation actually
// comes from the `Set.java` javadoc.
//
// This is **NOT** a HashSet since the determination of whether the map contains
// a specified key relies:
//
// - `key.equals(otherKey)` if key implements the equal function
// - `key === otherKey` otherwise
//
// The methods `add`, `addAll`, `contains` and `remove` rely on this logic.
//
// ## More about...
//
// - Collections : [Collections.js](./Collections.html)
//
// - Iterator: [Iterator.js](./Iterator.html)
//
// ## Source code
//
// import Collections.js
var Collections = require('./Collections');

// import Iterator.js
var Iterator = require('./Iterator');

//
// Constructor - no argument.
//
function Set() {

    'use strict';

    // the `array` in which all elements are stored.
    var elements = [];

    //
    // Adds the specified element to this set if it is not already present.
    // Returns `true` if this set did not already contain the specified element.
    //
    this.add = function(e) {
        if (!this.contains(e)) {
            elements.push(e);
            return true;
        }
        return false;
    };

    //
    // Adds all of the elements in the specified `array` to this set if they're not already present.
    // Return `true` if this set changed as a result of the call.
    //
    this.addAll = function(a) {
        var result = false;
        var length = a.length;
        for (var index = 0; index < length; index++) {
            var added = this.add(a[index]);
            result = result || added;
        }
        return result;
    };

    //
    // Removes all of the elements from this set.
    //
    this.clear = function(e) {
        elements = [];
    };

    //
    // Returns `true` if this set contains the specified element.
    //
    this.contains = function(e) {
        return Collections.indexOf(e, elements) !== -1;
    };

    //
    // Returns `true` if this set contains no elements.
    //
    this.isEmpty = function() {
        return this.size() === 0;
    };

    //
    // Removes the specified element from this set if it is present.
    // Returns `true` if this set contained the specified element.
    //
    this.remove = function(e) {
        var index = Collections.indexOf(e, elements);
        if (index !== 1) {
            elements.splice(index, 1);
            return true;
        }
        return false;
    };

    //
    // Returns the number of elements in this set.
    //
    this.size = function() {
        return elements.length;
    };

    //
    // Returns an iterator over the elements in this set.
    //
    this.iterator = function() {
        return new Iterator(elements);
    };

    //
    // Returns an `array` containing all of the elements in this set.
    //
    this.toArray = function() {
        return elements.slice(0);
    };

};

// expose API to Node.js
module.exports = Set;
