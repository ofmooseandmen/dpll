var Set = require('./Set.js');
var Map = require('./Map.js');

function Valuation(variables) {'use strict';

    /** @private contains all the unassigned variables - initialized with whole the variables. */
    var unassigned = variables;

    /** @private a map whose key is a variable and value is either true or false. */
    var solution = new Map();

    this.putSolution = function(variable, value) {
        // new solution
        solution.put(variable, value);
        // remove variable from unassigned
        unassigned.remove(variable);
    };

    this.getSolution = function(variable) {
        return solution.get(variable);
    };

    this.isAssigned = function(variable) {
        return solution.containsKey(variable);
    };

    this.unassigned = function() {
        return unassigned.keyArray();
    };

    this.solution = function() {
        return solution;
    };

    this.randomUnassignedVariable = function() {
        var unassignedArr = unassigned.keyArray();
        var random = Math.floor(Math.random() * (unassignedArr.length));
        return unassignedArr[random];
    };

    this.highestOccurrenceVariable = function() {
        var entries = unassigned.entries();
        var entriesLength = entries.length;
        var maxOcc = 0;
        var result = undefined;
        for (var index = 0; index < entriesLength; index++) {
			var entry = entries[index];
			if (entry.value > maxOcc) {
				maxOcc = entry.value;
				result = entry.key;
			}
        }
        return result;
    };

}

module.exports = Valuation;
