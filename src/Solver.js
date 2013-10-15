//
// Implementation of the Davis-Putnam-Logemann-Loveland (DPLL) algorithm.
//
// Everytime the `#solve()` method is called a new [valuation](./Valuation.html) is created and passed to the successive
// steps of the
// algorithm.
//
// 1. Evalutate the CNF formula with the current valuation by calling `CnfFormula#evaluate(Valuation)`
// 2. Return the solution of the valuation (a map) if evaluation is `true`
// 3. Run the *unit propagate* step of the algorithm by calling `CnfFormula#unitPropagate(Valuation)`
// 4. Run the *pure literal assign* step of the algorithm by calling `CnfFormula#pureLiteralAssign(Valuation)`
// 5. re-evaluate the CNF formula with the current valuation.
// 6. Return the solution of the valuation (a map) if evaluation is `true`
// 7. Return `undefined` if the evaluation is `false`
// 8. Choose a variable and assign it to `true`
// 9. Return the solution of the valuation (a map) if evaluation is `true`
// 10. Re-run the algorithm with the variable assigned to `false` instead
//
// The algorithm will eventually converge to either a solution or `undefined`.
//
// Step 8 is known as the *splitting rule*. Two selection modes are available:
//
// - random selection amongst unassigned variables; enabled by default or by calling `#randomVariableSelection()`
//
// - variable with highest occurrence amongst the unassigned variables; enabled by calling
// `#highestOccurrenceVariableSelection()`
//
//     var dpll = require('./src/dpll.js');
//     [...]
//     var solver = new dpll.Solver(formula);
//     var solution = solver.highestOccurrenceVariableSelection().solve();
//
// ## More about...
//
// - Valuation: [Valuation.js](./Valuation.html)
//
// - CNF formula: [CnfFormula.js](./CnfFormula.html)
//
// - Map: [Map.js](./Map.html)
//
// ## Source code
//
// import Valuation.js
var Valuation = require('./Valuation');

//
// Constructor - takes the formula to be solved as an input.
//
function Solver(formula) {

    'use strict';

    //
    // `true` for selection of unassigned random variable, `false` for selection of unassigned variable with highest
    // occurrence.
    //
    var useRandomSelection = true;

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

                // select `variable` to assign
                var newVar;
                if (useRandomSelection) {
                    newVar = valuation.randomUnassignedVariable();
                } else {
                    newVar = valuation.highestOccurrenceVariable();
                }

                // evaluate with truth `value = true`.
                valuation.putSolution(newVar, true);
                var afterNewVarTrueEval = formula.evaluate(valuation);
                if (true === afterNewVarTrueEval) {
                    // solution found.
                    return valuation.solution();
                } else {
                    // set truth value to `false` and rerun.
                    valuation.putSolution(newVar, false);
                    return run(valuation);
                }
            }
        } else if (formulaEval) {
            return valuation.solution();
        } else {
            return undefined;
        }
    }

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

};

// expose API to Node.js
module.exports = Solver;

