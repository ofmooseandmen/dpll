//
// A clause is a disjunction of [literals](./Literal.html) (or a single literal) or more simply put:
// > it is a *OR* of literals.
//
// ## Optimizations
// 1. If a clause contains the same literal more than once, only one instance of this literal will be kept.
// 2. If a clause contains both a positve literal and a negative literal of the same variable they are optimized away -
// i.e. removed from the clause, since the value of this variable is irrelevant; *(true &or; false)* is always *true*.
//
// ## More about...
//
// - Literals: [Literal.js](./Literal.html)
//
// - Sets: [Set.js](./Set.html)
//
// ## Source code
//
// import Set.js
var Set = require('./Set');

// import Literal.js
var Literal = require('./Literal');

//
// Constructor - takes the first variable, its negation (a `boolean`) and the enclosing `CnfFormula` as input.
// It is not intented to be used anywhere but `CnfFormula#openClause` and `CnfFormula#openClauseNot`.
//
function Clause(variable, negation, formula) {
	
    'use strict';

    // the set of variables - holds variable that have not been optimized away.
    var vars = new Set();

    // the set of literals corresponding to the variables.
    var literals = new Set();

    vars.add(variable);
    literals.add(new Literal(variable, negation));

    //
    // Add the specified variable / literal to this clause.
    //
    function add(variable, literal) {
        if (vars.contains(variable) && !literals.contains(literal)) {
            // trying to add *x &or; &not;x*: remove var and previous literal
            var succes = vars.remove(variable);
            if (!succes) {
                throw new Error();
            }
            // if this literal is positive it means that a negative literal exists
            // remove it
            var wasNegated = literal.isPositive();
            literals.remove(new Literal(variable, wasNegated));
        } else {
            // since Sets are used adding *x &or; x* will have no effect.
            vars.add(variable);
            literals.add(literal);
        }
    };

    //
    // Add the specified variable as a positive literal to this clause and returns this instance.
    //
    this.or = function(variable) {
        var literal = new Literal(variable, false);
        add(variable, literal);
        return this;
    };

    //
    // Add the specified variable as a negative literal to this clause and returns this instance.
    //
    this.orNot = function(variable) {
        var literal = new Literal(variable, true);
        add(variable, literal);
        return this;
    };

    //
    // Terminates this clause, adds it to the enclosing `CnfFormula` and returns the enclosing `CnfFormula`.
    //
    this.close = function() {
        return formula.addClause(this, vars, literals);
    };

    //
    // Evaluate this clause against the specified valuation and returns
    //
    // - `true` if this clause is satisfied under the specified valudation
    // - `false` if this clause is not satisfied under the specified valudation
    // - `undefined` if the specified valudation does not allow to evaluate this clause - i.e. some variables are
    // still unassigned
    //
    this.evaluate = function(valuation) {
        var size = literals.size();
        var result;
        if (size > 0) {
            var it = literals.iterator();
            result = false;
            while (it.hasNext() && result !== undefined && !result) {
                var literal = it.next();
                var value = valuation.getSolution(literal.variable());
                if (value !== undefined) {
                    result = literal.evaluate(value);
                } else {
                    result = undefined;
                }
            }
        } else {
            // no literal it means that clause was something like *x &or; &not;x*
            result = true;
        }
        return result;
    };

    //
    // Performs the *unit propagation* step. If a clause is a unit clause, i.e. it contains only a single unassigned
    // literal, this clause can only be satisfied by assigning the necessary value to make this literal true. Thus, no
    // choice is necessary. In practice, this often leads to deterministic cascades of units, thus avoiding a large part
    // of the naive search space.
    //
    // The specified `valuation` will be filled with computed variable truth assignments upon return.
    //
    this.unitPropagate = function(valuation) {
        var size = literals.size();
        if (size > 0) {
            var it = literals.iterator();
            var count = 0;
            var literal = undefined;
            while (it.hasNext()) {
                var l = it.next();
                if (!valuation.isAssigned(l.variable())) {
                    count++;
                    literal = l;
                }
            }

            if (count === 1) {
                // this is a unit clause
                if (literal.isPositive()) {
                    // assign variable to true
                    valuation.putSolution(literal.variable(), true);
                } else {
                    // assign variable to false
                    valuation.putSolution(literal.variable(), false);
                }
            }
        }
    };

};

// expose API to Node.js
module.exports = Clause;
