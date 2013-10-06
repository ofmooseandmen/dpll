var assert = require('assert');
var CnfFormula = require('../src/CnfFormula');
var Valuation = require('../src/Valuation');

describe('CnfFormula', function() {
    describe('#variables', function() {
        it('should return a map whose keys are variables and value the number of occurences in the formula', function() {
            var cnf = new CnfFormula();
            var a = {};
            var b = {};
            var c = {};
            var d = {};
            var e = {};
            cnf.openClause(a).or(b).close().openClauseNot(b).or(c).orNot(d).close().openClause(d).orNot(e).close();
            var vars = cnf.variables();
            assert.equal(1, vars.get(a));
            assert.equal(2, vars.get(b));
        	assert.equal(1, vars.get(c));
        	assert.equal(2, vars.get(d));
        	assert.equal(1, vars.get(e));
        });
    });

    describe('#evaluate', function() {
        it('should return undefined if at least one variable has not been assigned with a truth value', function() {
            var cnf = new CnfFormula();
            var a = {};
            var b = {};
            var c = {};
            var d = {};
            var e = {};
            cnf.openClause(a).or(b).close().openClauseNot(b).or(c).orNot(d).close().openClause(d).orNot(e).close();
            var valuation = new Valuation(cnf.variables());
            valuation.putSolution(a, true);
            valuation.putSolution(b, true);
            valuation.putSolution(c, false);
            valuation.putSolution(d, false);
            assert.equal(undefined, cnf.evaluate(valuation));
        });

        it('should return false if at least one clause evaluates to false', function() {
            var cnf = new CnfFormula();
            var a = {};
            var b = {};
            var c = {};
            var d = {};
            var e = {};
            cnf.openClause(a).or(b).close().openClauseNot(b).or(c).orNot(d).close().openClause(d).orNot(e).close();
            var valuation = new Valuation(cnf.variables());
            // 2 clause is false => b = true, c = false, d = true
            valuation.putSolution(a, true);
            valuation.putSolution(b, true);
            valuation.putSolution(c, false);
            valuation.putSolution(d, true);
            valuation.putSolution(e, true);
            assert.equal(false, cnf.evaluate(valuation));
        });

        it('should return true if all clauses evaluates to true', function() {
            var cnf = new CnfFormula();
            var a = {};
            var b = {};
            var c = {};
            var d = {};
            var e = {};
            cnf.openClause(a).or(b).close().openClauseNot(b).or(c).orNot(d).close().openClause(d).orNot(e).close();
            var valuation = new Valuation(cnf.variables());
            valuation.putSolution(a, true);
            valuation.putSolution(b, false);
            valuation.putSolution(c, false);
            valuation.putSolution(d, true);
            valuation.putSolution(e, true);
            assert.equal(true, cnf.evaluate(valuation));
        });

    });

});
