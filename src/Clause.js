var Set = require('./Set.js');
var Literal = require('./Literal.js');

function Clause(variable, negation, aCNF) {'use strict';

    var vars = new Set();
    var literals = new Set();
    vars.add(variable);
    literals.add(new Literal(variable, negation));
    var CNF = aCNF;

    function add(variable, literal) {
        if (vars.contains(variable) && !literals.contains(literal)) {
            // trying to add x || -x
            // remove var and previous literal
            var succes = vars.remove(variable);
            if (!succes) {
                throw new Error();
            }
            // if this literal is positive it means that a negative literal exists
            // remove it
            var wasNegated = literal.isPositive();
            literals.remove(new Literal(variable, wasNegated));
        } else {
        	// since Set are used adding x | x will have no effect - only one x is kept.
            vars.add(variable);
            literals.add(literal);
        }
    };

    this.or = function(variable) {
        var literal = new Literal(variable, false);
        add(variable, literal);
        return this;
    };

    this.orNot = function(variable) {
        var literal = new Literal(variable, true);
        add(variable, literal);
        return this;
    };

    this.close = function() {
        return CNF.addClause(this);
    };

    this.variables = function() {
        return vars.toArray();
    };

    this.literals = function() {
        return literals.toArray();
    };

    // valuation is a map variable / boolean - variables not assigned are not present.
    // return true/false/undefined
    this.evaluate = function(valuation) {
        var size = literals.size();
        var result;
        if (size > 0) {
            var literalsArray = literals.toArray();
            result = false;
            for (var index = 0; index < size && result !== undefined && !result; index++) {
                var literal = literalsArray[index];
                var value = valuation.getSolution(literal.variable());
                if (value !== undefined) {
                    result = literal.evaluate(value);
                } else {
                    result = undefined;
                }
            }
        } else {
            // no literal it means that clause was something like x | -x
            result = true;
        }
        return result;
    };

    this.unitPropagate = function(valuation) {
        var size = literals.size();
        if (size > 0) {
            var literalsArray = literals.toArray();
            var count = 0;
            var unitIndex = -1;
            for (var index = 0; index < size; index++) {
                if (!valuation.isAssigned(literalsArray[index].variable())) {
                    count++;
                    unitIndex = index;
                }
            }
            if (count === 1) {
                // this is a unit clause
                var l = literalsArray[unitIndex];
                if (l.isPositive()) {
                    // assign variable to true
                    valuation.putSolution(l.variable(), true);
                } else {
                    // assign variable to false
                    valuation.putSolution(l.variable(), false);
                }
            }
        }
    };

};

module.exports = Clause;
