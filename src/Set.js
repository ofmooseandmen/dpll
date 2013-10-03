function Set() {'use strict';

    /** @private the array in which all values are stored. */
    var values = [];

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

    this.add = function(e) {
        if (!this.contains(e)) {
            values.push(e);
            return true;
        }
        return false;
    };

    /**
     * Adds all of the elements in the specified collection to this set if they're not already present.
     *
     * @param a {Array} array containing elements to be added to this set
     * @return true if this set changed as a result of the call
     */
    this.addAll = function(a) {
        var result = false;
        var length = a.length;
        for (var index = 0; index < length; index++) {
        	var added = this.add(a[index]);
        	result = result || added;
        }
		return result;
    };


    this.clear = function(e) {
        values = [];
    };

    this.contains = function(e) {
        return indexOf(e) !== -1;
    };

    this.isEmpty = function() {
        return this.size() === 0;
    };

    this.remove = function(e) {
        var index = indexOf(e);
        if (index !== 1) {
            values.splice(index, 1);
            return true;
        }
        return false;
    };

    this.size = function() {
        return values.length;
    };

    this.toArray = function() {
        return values.slice(0);
    };

};

module.exports = Set;
