//
// Implementation of the Davis-Putnam-Logemann-Loveland (DPLL) algorithm.
//
// Everytime the `solve` method is called a new `Valuation` is created and passed to the successive steps of the
// algorithm.
//
// - Evalutate the CNF formula with the current valuation: `CnfFormula#evaluate(Valuation).
// - Return the solution of the valuation (a map) if evaluation is `true`
// - Run the *unit propagate* step of the algorithm: `CnfFormula#unitPropagate(Valuation)`
// - Run the *pure literal assign* step of the algorithm: `CnfFormula#pureLiteralAssign(Valuation)`
// - re-evaluate the CNF formula with the current valuation.
// - Return the solution of the valuation (a map) if evaluation is `true`
// - Return `undefined` if the evaluation is `false`
// - Pick a variable according to the selection mode and assign it to `true`
// - Return the solution of the valuation (a map) if evaluation is `true`
// - Re-run the algorithm with the variable assigned to `false` instead
//
// The algorithm will eventually converge to either a solution or `undefined`...

// More about...
//
// - Valuation: [Valuation.js](./Valuation.html)
//
// - CNF formula: [CnfFormula.js](./CnfFormula.html)
//
// - Maps: [Map.js](./Map.html)
//
// Constructor - takes a `CnfFormula` as input.
//
function Solver(aFormula) {'use strict';

    var Valuation = require('./Valuation');

    // the formula to be solved in CnfFormula.
    var formula = aFormula;

    // `true` for random variable selection, <code>false</false> for highest occurrence variable selection.
    var useRandomSelection = true;

    //
    // Sets the variable selection alogrithm to random selection mode and return `this`.
    //
    this.randomVariableSelection = function() {
        useRandomSelection = true;
        return this;
    };

    //
    // Sets the variable selection alogrithm to highest occurrence selection mode and return `this`.
    //
    this.highestOccurrenceVariableSelection = function() {
        useRandomSelection = false;
        return this;
    };

    //
    // Tries and solves the CNF. Returns either a `map` whose `keys` are the variables and `values` are
    // either `true` or `false`.
    //
    // if the CNF formula has been solved the result will **NOT**
    // contain the variables that have been optimized away. For instance
    // if the formula contains the clause ` (x | -x | y) ` and `x` is not present
    // in any other clause of the formula, then `x` is optimized away and therefore
    // its value is irrelevant - i.e. it can be `true` or `false`.
    //
    this.solve = function() {
        var valuation = new Valuation(formula.variables());
        return run(valuation);
    };

    //
    // Runs all steps of the algorithm eventually calling itself back if need be. Fills the specified
    // `valuation` along the way.
    //
    function run(valuation) {
        var formulaEval = formula.evaluate(valuation);
        if (formulaEval === undefined) {
            formula.unitPropagate(valuation);
            formula.pureLiteralAssign(valuation);
            var afterOptimEval = formula.evaluate(valuation);
            if (true === afterOptimEval) {
                return valuation.solution();
            } else if (false === afterOptimEval) {
                return undefined;
            } else {

                // select variable to assign
                var newVar;
                if (useRandomSelection) {
                    newVar = valuation.randomUnassignedVariable();
                } else {
                    newVar = valuation.highestOccurrenceVariable();
                }

                // evaluate with truth value = true.
                valuation.putSolution(newVar, true);
                var afterNewVarTrueEval = formula.evaluate(valuation);
                if (true === afterNewVarTrueEval) {
                    // solution found.
                    return valuation.solution();
                } else {
                    // set truth value to false and rerun.
                    valuation.putSolution(newVar, false);
                    return run(valuation);
                }
            }
        } else if (formulaEval) {
            return valuation.solution();
        } else {
            return undefined;
        }
    };

};

// expose API to Node.js
module.exports = Solver;

