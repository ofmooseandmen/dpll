//
// The valuation of a `CnfFormula`.
//
// It keeps tracks of the following attributes during the execution of the DPLL algorithm:
//
// - the currently **unassigned** variables and the number of occurrence of each of them in the formula
//
// - the currently **assigned** variables and their value: `true` or `false`
//
// Also provides service to pick a variable:
//
// - at random amongst the unassigned variables: `#randomUnassignedVariable()`
//
// - with the highest number of occurrences in the formula: `#highestOccurrenceVariable()`
//
// ## More about...
//
// - Map: [Map.js](./Map.html)
//
// ## Source code
//
// import Map.js
var Map = require('./Map');

//
// Constructor - takes `map` whose `keys` are the variable and `values` the number of occurrences in the formula.
//
function Valuation(variables) {

    'use strict';

    // contains all the unassigned variables - initialized with all the variables.
    var unassigned = new Map();
    unassigned.putAll(variables);

    // a map whose key is a variable and value is either true or false.
    var solution = new Map();

    //
    // Assign the specified `variable` to the specified `boolean` value.
    //
    this.putSolution = function(variable, value) {
        // new solution
        solution.put(variable, value);
        // remove variable from `unassigned`
        unassigned.remove(variable);
    };

    //
    // Returns the current value of the specified `variable`: `true`, `false` or `undefined`.
    //
    this.getSolution = function(variable) {
        return solution.get(variable);
    };

    //
    // Returns `true` if the specified `variable` is currently assigned to `true`.
    //
    this.isAssigned = function(variable) {
        return solution.containsKey(variable);
    };

    //
    // Returns a `Set` containing all the variables currently unassigned.
    //
    this.unassigned = function() {
        return unassigned.keySet();
    };

    //
    // Returns the `map` of solutions: `key` is variable, value is `true` or `false`.
    // Variables that have been optimized away are not assigned with a truth value.
    // See [CnfFormula.js](./CnfFormula.html)
    //
    this.solution = function() {
        return solution;
    };

    //
    // Returns a `variable` at random amongst the currently unassigned variables.
    //
    this.randomUnassignedVariable = function() {
        var unassignedArr = unassigned.keySet().toArray();
        var random = Math.floor(Math.random() * (unassigned.size()));
        return unassignedArr[random];
    };

    //
    // Returns the `variable` with highest occurrences in the formula amongst the currently unassigned variables.
    //
    this.highestOccurrenceVariable = function() {
        var it = unassigned.iterator();
        var maxOcc = 0;
        var result = undefined;
        while (it.hasNext()) {
            var entry = it.next();
            if (entry.value > maxOcc) {
                maxOcc = entry.value;
                result = entry.key;
            }
        }
        return result;
    };

}

// expose API to Node.js
module.exports = Valuation;
