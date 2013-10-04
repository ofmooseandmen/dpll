var Map = require('./Map.js');
var Valuation = require('./Valuation.js');

/**
 * Implementation of the Davis–Putnam–Logemann–Loveland (DPLL) algorithm
 * for solving for solving the CNF-SAT problem.
 * <p>
 * A CNF is a propositional logic formulae in conjunctive normal form - i.e. an ANDs of ORs
 *
 * see http://en.wikipedia.org/wiki/DPLL_algorithm
 * 
 * @constructor
 * @param {CNF} the formula in conjunctive normal form to be solved
 */
function DPLL(aFormula) {

    var formula = aFormula;

    /**
     * Solves the CNF formula of this {DPLL} and returns either
     * <ul>
     * <li>a map whose keys are the variables of the CNF and values
     * are either <code>true</code> or <false>
     * <li>or <code>undefined</code> if the CNF could not be solved
     * </ul>
     * <p>
     * if the CNF formula has been solved the result will <b>NOT</b>
     * contain the variables that have been optimized away. For instance
     * if the formula contains the clause (x | -x | y) and x is not present
     * in any other clause of the formula, then x is optimized away and therefore
     * its value is irrelevant - i.e. it could be <code>true</code> or <code>false</code>.
     *
     * @return {Map} a map whose keys are the variables of the CNF
     *               and values are either <code>true</code> or <false>
     *               or <code>undefined</code> if the CNF could not be solved
     */
    this.solve = function() {
        var valuation = new Valuation(formula.variables());
        return run(valuation);
    };

    /**
     * Internal run recursively called.
     * 
     * @param {Valuation} valuation object holding the solution being computed
     * @return {Map} the solution or <code>undefined</code>
     */
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

                // select variable at random amongst variables that are not assigned - i.e. truth value is undefined.
                var random = valuation.randomUnassignedVariable();

                // evaluate with truth value = true.
                valuation.putSolution(random, true);
                var afterRandomTrueEval = formula.evaluate(valuation);
                if (true === afterRandomTrueEval) {
                    // solution found.
                    return valuation.solution();
                } else {
                    // set truth value to false and rerun.
                    valuation.putSolution(random, false);
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

module.exports = DPLL;

