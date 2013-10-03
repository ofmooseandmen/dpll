var Map = require('./Map.js');
var Set = require('./Set.js');
var Clause = require('./Clause.js');

function CNF() {'use strict';

    var clauses = [];

    var variables = new Set();

    var positiveLiterals = new Map();

    var negativeLiterals = new Map();

    this.openClause = function(variable) {
        return new Clause(variable, false, this);
    };

    this.openClauseNot = function(variable) {
        return new Clause(variable, true, this);
    };

    this.addClause = function(clause) {
        clauses.push(clause);
        variables.addAll(clause.variables());
        var literals = clause.literals();
        var length = literals.length;
        for (var index = 0; index < length; index++) {
            var l = literals[index];
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
        // FIXME: implement iterator on Set?
        var unassigned = valuation.unassigned().toArray();
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
