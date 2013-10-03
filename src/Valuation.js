var Set = require('./Set.js');
var Map = require('./Map.js');

function Valuation(variables) {
	
	'use strict';

    /** @private contains all the unassigned variables. */
    var unassigned = new Set();
    unassigned.addAll(variables);

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
        return unassigned;
    };

    this.solution = function() {
        return solution;
    };

    this.randomUnassignedVariable = function() {
    	var unassignedArr = unassigned.toArray();
        var random = Math.floor(Math.random() * (unassignedArr.length));
        return unassignedArr[random];
    };

}

module.exports = Valuation;
