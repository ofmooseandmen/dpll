var Map = require('./Map.js');
var Valuation = require('./Valuation.js');

/**
 * Implementation of the Davis–Putnam–Logemann–Loveland (DPLL) algorithm
 * for solving for solving the CNF-SAT problem.
 * <p>
 * A CNF is a propositional logic formulae in conjunctive normal form - i.e. an ANDs of ORs
 * <p>
 * Two variable selection modes are available for the <i>splitting rule</i>
 * <ul>
 * <li>random selection amongst unassigned variables; enabled by default or by calling #randomVariableSelection,
 * <li>variable with highest occurrence amongst the unassigned variables; enabled by calling
 * #highestOccurrenceVariableSelection.
 * </ul>
 *
 * <p>
 * see http://en.wikipedia.org/wiki/DPLL_algorithm
 *
 * @constructor
 * @param {CNF} the formula in conjunctive normal form to be solved
 */
function DPLL(aFormula) {

    /** @private the formula to be solved in CNF. */
    var formula = aFormula;

    /** @private <code>true</code> for random variable selection, <code>false</false> for highest occurrence variable
     * selection. */
    var useRandomSelection = true;

    /**
     * Set the variable selection alogrithm to random selection mode.
     *
     * @return {DPLL} this
     */
    this.randomVariableSelection = function() {
        useRandomSelection = true;
        return this;
    };

    /**
     * Set the variable selection alogrithm to highest occurrence selection mode.
     *
     * @return {DPLL} this
     */
    this.highestOccurrenceVariableSelection = function() {
        useRandomSelection = false;
        return this;
    };

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

module.exports = DPLL;

