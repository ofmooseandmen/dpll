var assert = require('assert');
var CnfFormula = require('../src/CnfFormula');
var Solver = require('../src/Solver');

describe('Solver', function() {
    describe('#solve', function() {
        it('should return a Map which is the solution (random selection)', function() {
            var formula = new CnfFormula();
            var a = {};
            var b = {};
            var c = {};
            var d = {};
            var e = {};
            // (a | b) & (-b | c | -d) & (d | -e)
            formula.openClause(a).or(b).close().openClauseNot(b).or(c).orNot(d).close().openClause(d).orNot(e).close();
            var solver = new Solver(formula);
            var solution = solver.solve();
            assert.equal(5, solution.size());
        });
        
        it('should return a Map which is the solution (highest occurrence selection)', function() {
            var formula = new CnfFormula();
            var a = {};
            var b = {};
            var c = {};
            var d = {};
            var e = {};
            // (a | b) & (-b | c | -d) & (d | -e)
            formula.openClause(a).or(b).close().openClauseNot(b).or(c).orNot(d).close().openClause(d).orNot(e).close();
            var solver = new Solver(formula);
            var solution = solver.highestOccurrenceVariableSelection().solve();
            assert.equal(5, solution.size());
        });

        it('should return a Map which is the solution but provide no value for x', function() {
            var formula = new CnfFormula();
            var a = {};
            var b = {};
            var c = {};
            var d = {};
            var e = {};
            var x = {};
            // will be optimized away
            // (a | b | x | -x) & (-b | c | -d) & (d | -e)
            formula.openClause(a).or(b).or(x).orNot(x).close().openClauseNot(b).or(c).orNot(d).close().openClause(d).orNot(e).close();
            var solver = new Solver(formula);
            var solution = solver.solve();
            assert.equal(5, solution.size());
            assert.equal(undefined, solution.get(x));
        });

    });

});
