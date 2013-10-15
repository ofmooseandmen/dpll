//
// A "Java-style" iterator over an `array`.
//     
//     var it = new Iterator([1, 2, 3]);
//     while (it.hasNext()) {
//         console.log(it.next());
//     }
//     
// ## Source code
//
// Constructor - takes the array to iterate over as input.
function Iterator(arr) {

    'use strict';	

    // length of `array` to iterate on.
    var length = arr.length;

    // current index of this iterator.
    var current = 0;

    //
    // Returns `true` if the iteration has more elements.
    //
    this.hasNext = function() {
        return current < length;
    };

    //
    // Returns the next element in the iteration or `undefined` if there is not more element.
    //
    this.next = function() {
        return arr[current++];
    };

}

// expose API to Node.js
module.exports = Iterator; 