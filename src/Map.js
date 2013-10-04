/**
 * An object that maps keys to values.
 * A map cannot contain duplicate keys; each key can map to at most one value.
 * <p>
 * The API is based on java Map interface.
 * <p>
 * This is <b>NOT</b> a HashMap since the determination of whether the map contains
 * a specified key relies
 * <ul>
 * <li>key.equals(otherKey) if key implements the equal function
 * <li>key === otherKey otherwise
 * </ul>
 *
 * @constructor
 */
function Map() {

    /** @private the array in which all keys are stored. */
    var keys = [];

    /** @private the array in which all values are stored. */
    var values = [];

    /**
     * Associates the specified value with the specified key in this map. If the map previously
     * contained a mapping for the key, the old value is replaced by the specified value.
     * In order to determine whether this map contains the specified key, this function relies on either:
     * <ul>
     * <li>key.equals(otherKey) if key implements the equal function
     * <li>key === otherKey otherwise
     * </ul>
     *
     * @param key {Object} key with which the specified value is to be associated
     * @param value {Object} value to be associated with the specified key
     * @return {Object} the previous value associated with key, or undefined if there was no mapping for key.
     */
    this.put = function(key, value) {
        var keyIndex = indexOfKey(key);
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

    /**
     * Returns the value to which the specified key is mapped, or undefined if this map contains no mapping for the key.
     * In order to determine whether this map contains the specified key, this function relies on either:
     * <ul>
     * <li>key.equals(otherKey) if key implements the equal function
     * <li>key === otherKey otherwise
     * </ul>
     *
     * @param key {Object} the key whose associated value is to be returned
     * @return {Object}  the value to which the specified key is mapped, or undefined if this map contains no mapping
     * for the key
     */
    this.get = function(key) {
        var keyIndex = indexOfKey(key);
        var result = undefined;
        if (keyIndex !== -1) {
            result = values[keyIndex];
        }
        return result;
    };

    this.containsKey = function(key) {
        return indexOfKey(key) !== -1;
    };

    /**
     * Removes the mapping for a key from this map if it is present.
     * In order to determine whether this map contains the specified key, this function relies on either:
     * <ul>
     * <li>key.equals(otherKey) if key implements the equal function
     * <li>key === otherKey otherwise
     * </ul>
     *
     * @param key {Object} key whose mapping is to be removed from the map
     * @return {Object} the previous value associated with key, or undefined if there was no mapping for key
     */
    this.remove = function(key) {
        var keyIndex = indexOfKey(key);
        var result = undefined;
        if (keyIndex !== -1) {
            keys.splice(keyIndex, 1);
            var res = values.splice(keyIndex, 1);
            result = res[0];
        }
        return result;
    };

    /**
     * Returns true if this map contains no key-value mappings.
     *
     * @return {Boolean} true if this map contains no key-value mappings.
     */
    this.isEmpty = function() {
        return keys.length === 0;
    };
    
    /**
     * Returns the number of key-value mappings in this map.
     * 
     * @return {int} the number of key-value mappings in this map
     */
    this.size = function() {
    	return keys.length;
    };
    
    /**
     * Returns an array of the keys contained in this map.
     * 
     * @return an array of the keys contained in this map
     */
    this.keyArray = function() {
    	return keys.slice(0);
    };

    function indexOfKey(key) {
        var result = -1;
        if ( typeof key.equals === 'function') {
            var keysLength = keys.length;
            for (var index = 0; index < keysLength && result == -1; index++) {
                if (key.equals(keys[index])) {
                    result = index;
                }
            }
        } else {
            result = keys.indexOf(key);
        }
        return result;
    }

}

// module exports for Node.js.
module.exports = Map;
