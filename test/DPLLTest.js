var assert = require("assert");
var CNF = require("../src/CNF.js");
var DPLL = require("../src/DPLL.js");

describe('DPLL', function() {
    describe('#solve', function() {
        it('should return a Map which is the solution', function() {
            var cnf = new CNF();
            var a = {};
            var b = {};
            var c = {};
            var d = {};
            var e = {};
            // (a | b) & (-b | c | -d) & (d | -e)
            cnf.openClause(a).or(b).close().openClauseNot(b).or(c).orNot(d).close().openClause(d).orNot(e).close();
            var dpll = new DPLL(cnf);
            var result = dpll.solve().solution();
            assert.equal(5, result.size());
        });
    });

});
