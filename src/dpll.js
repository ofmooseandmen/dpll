// # DPLL.js
// 
// An implementation of the Davis–Putnam–Logemann–Loveland ([DPLL](http://en.wikipedia.org/wiki/DPLL_algorithm)) algorithm for solving for 
// solving the [CNF-SAT](http://en.wikipedia.org/wiki/Boolean_satisfiability_problem) problem.
// 
// This algorithm decides the satisfiability of propositional logic formulae in conjunctive normal form ([CNF](http://en.wikipedia.org/wiki/Conjunctive_normal_form)) - i.e. an ANDs of ORs.
// 
// ## Usage
// The following code snippet solves the SAT problem for the following CNF formula: 
// ` (a | b) & (-b | c | -d) & (d | -e) `
//     
//     var dpll = require('./src/dpll.js');
//     var formula = new dpll.CnfFormula();
//     var a = {};
//     var b = {};
//     var c = {};
//     var d = {};
//     var e = {};
//     formula.openClause(a).or(b).close()
//            .openClauseNot(b).or(c).orNot(d).close()
//            .openClause(d).orNot(e).close();
//     var solver = new dpll.Solver(formula);
//     var solution = solver.solve();
//     console.log(solution.get(a));
//     
// if the CNF formula has been solved the result will <b>NOT</b> contain the variables that have
// been optimized away. For instance if the formula contains the clause ` (x | -x | y) ` and `x` is not 
// present in any other clause of the formula, then `x` is optimized away and therefore its value is 
// irrelevant - i.e. it could be `true` or `false`.
// 
// Two mode for selecting variables in order to apply the *splitting rule* are available.
// 
// - random selection amongst unassigned variables; enabled by default or by calling `randomVariableSelection`
// 
// - variable with highest occurrence amongst the unassigned variables; enabled by calling `highestOccurrenceVariableSelection`
// 
// The following code snippet enables selection of unassigned variable with highest occurrence:
//     
//     var dpll = require('./src/dpll.js');
//     [...]
//     var solver = new dpll.Solver(formula);
//     var solution = solver.highestOccurrenceVariableSelection().solve();
//
exports.CnfFormula = require('./CnfFormula');
exports.Solver = require('./Solver');
