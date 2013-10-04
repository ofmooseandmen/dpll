var Map = require('./Map.js');
var Set = require('./Set.js');
var Clause = require('./Clause.js');

function CNF() {'use strict';

    var clauses = [];

    /* @private a map whose keys are variables and value the number of occurences in the formula. */
    var variables = new Map();

    var positiveLiterals = new Map();

    var negativeLiterals = new Map();

    function addVariables(someVars) {
        var length = someVars.length;
        for (var index = 0; index < length; index++) {
            var someVar = someVars[index];
            var occ = variables.get(someVar);
            if (occ === undefined) {
                variables.put(someVar, 1);
            } else {
                variables.put(someVar, occ + 1);
            }
        }
    };

    this.openClause = function(variable) {
        return new Clause(variable, false, this);
    };

    this.openClauseNot = function(variable) {
        return new Clause(variable, true, this);
    };

    this.addClause = function(clause, vars, literals, irrelevant) {
        clauses.push(clause);
        addVariables(vars.toArray());
        var literalsArr = literals.toArray();
        var length = literalsArr.length;
        for (var index = 0; index < length; index++) {
            var l = literalsArr[index];
            if (l.isPositive()) {
                positiveLiterals.put(l.variable(), l);
            } else {
                negativeLiterals.put(l.variable(), l);
            }
        }
        return this;
    };

    this.variables = function() {
        return variables;
    };

    // valuation is a map variable / boolean - variables not assigned are not present.
    // return true/false/undefined
    this.evaluate = function(valuation) {
        var result = true;
        var length = clauses.length;
        for (var index = 0; index < length && result !== undefined && result; index++) {
            result = clauses[index].evaluate(valuation);
        }
        return result;
    };

    this.unitPropagate = function(valuation) {
        var length = clauses.length;
        for (var index = 0; index < length; index++) {
            clauses[index].unitPropagate(valuation);
        }
    };

    // FIXME: UT!!!!
    this.pureLiteralAssign = function(valuation) {
        var unassigned = valuation.unassigned();
        var length = unassigned.length;
        for (var index = 0; index < length; index++) {
            var variable = unassigned[index];
            // variable not assign, check if pure literal.
            var pLiteral = positiveLiterals.containsKey(variable);
            var nLiteral = negativeLiterals.containsKey(variable);
            if (pLiteral && !nLiteral) {
                valuation.putSolution(variable, true);
            } else if (nLiteral && !pLiteral) {
                valuation.putSolution(variable, false);
            }
        }
    };

}

module.exports = CNF;
