//
// A collection that contain no duplicate element
//
// API is based on java Set interface.
//
// This is <b>NOT</b> a HashSet since the determination of whether the map contains
// a specified key relies:
//
// - `key.equals(otherKey)` if key implements the equal function
// - `key === otherKey` otherwise
//
// The methods `add`, `addAll`, `contains` and `remove` rely on this logic.
//
function Set() {'use strict';

    // the array in which all elements are stored.
    var values = [];

    //
    // Returns the index of the specified `element` in the `array` of elements `set` or
    // `-1` if this `set` does not contain the specified `element`.
    function indexOf(e) {
        var result = -1;
        if ( typeof e.equals === 'function') {
            var length = values.length;
            for (var index = 0; index < length && result == -1; index++) {
                if (e.equals(values[index])) {
                    result = index;
                }
            }
        } else {
            result = values.indexOf(e);
        }
        return result;
    };

    //
    // Adds the specified `element` to this `set` if it is not already present.
    // Returns `true` if this `set` did not already contain the specified `element`.
    //
    this.add = function(e) {
        if (!this.contains(e)) {
            values.push(e);
            return true;
        }
        return false;
    };

    //
    // Adds all of the elements in the specified `array` to this `set` if they're not already present.
    // Return `true` if this `set` changed as a result of the call.
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
    // Removes all of the elements from this `set`.
    //
    this.clear = function(e) {
        values = [];
    };

    //
    // Returns `true` if this `set` contains the specified `element`.
    //
    this.contains = function(e) {
        return indexOf(e) !== -1;
    };

    //
    // Returns `true` if this set contains no elements.
    //
    this.isEmpty = function() {
        return this.size() === 0;
    };

    //
    // Removes the specified `element` from this `set` if it is present.
    // Returns `true` if this `set` contained the specified element.
    //
    this.remove = function(e) {
        var index = indexOf(e);
        if (index !== 1) {
            values.splice(index, 1);
            return true;
        }
        return false;
    };

    //
    // Returns the number of elements in this `set`.
    //
    this.size = function() {
        return values.length;
    };

    //
    // Returns an array containing all of the elements in this set.
    //
    this.toArray = function() {
        return values.slice(0);
    };

};

module.exports = Set;
