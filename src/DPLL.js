var Map = require('./Map.js');
var Valuation = require('./Valuation.js');

// @see http://www.mpi-inf.mpg.de/~sofronie/lecture-ar-09/slides/lecture-14-may.pdf
/**
 * boolean DPLL(clause set N, partial valuation A) {
 *     if (all clauses in N are true under A) return true;
 *     elsif (some clause in N is false under A) return false;
 *     elsif (N contains unit clause P) return DPLL(N, A U { P -> 1 });
 *     elsif (N contains unit clause !P) return DPLL(N, A U { P -> 0 });
 *     elsif (N contains pure literal P) return DPLL(N, A U { P -> 1 });
 *     elsif (N contains pure literal !P) return DPLL(N, A U { P -> 0 });
 *     else {
 *         let P be some undefined variable in N;
 *          if (DPLL(N, A { P -> 0 })) return true;
 *          else return DPLL(N, A { P -> 1 });
 *     }
 * }
 */
function DPLL(aCnf) {

    var cnf = aCnf;

    
    
    this.solve = function() {
    	var valuation = new Valuation(cnf.variables().toArray());
    	return run(valuation);
    };

    function run(valuation) {
        var cnfEval = cnf.evaluate(valuation);
        if (cnfEval === undefined) {
            cnf.unitPropagate(valuation);
            cnf.pureLiteralAssign(valuation);
            var afterOptimEval = cnf.evaluate(valuation);
            if (true === afterOptimEval) {
                return valuation;
            } else if (false === afterOptimEval) {
                return undefined;
            } else {

                // select variable at random amongst variables that are not assigned - i.e. truth value is undefined.
                var random = valuation.randomUnassignedVariable();

                // evaluate with truth value = true.
                valuation.putSolution(random, true);
                var afterRandomTrueEval = cnf.evaluate(valuation);
                if (true === afterRandomTrueEval) {
                    // solution found.
                    return valuation;
                } else {
                    // set truth value to false and rerun.
                    valuation.putSolution(random, false);
                    return run(valuation);
                }
            }
        } else if (cnfEval) {
            return valuation;
        } else {
            return undefined;
        }
    };
    
};

module.exports = DPLL;

