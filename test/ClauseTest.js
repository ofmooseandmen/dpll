var assert = require('assert');
var Clause = require('../src/Clause');
var Map = require('../src/Map');
var Set = require('../src/Set');
var Valuation = require('../src/Valuation');

describe('Clause', function() {
    describe('evaluate', function() {
        it('should return undefined if at least one literal has not been assigned with a truth value.', function() {
            var v1 = {};
            var c = new Clause(v1, false, undefined);
            // we don't need the whole set of variables here.
            var valuation = new Valuation(new Map());
            assert.equal(undefined, c.evaluate(valuation));
        });

        it('should return true if at least one literal has been assigned with a true value.', function() {
            var v1 = {};
            var v2 = {};
            var v3 = {};
            var c = new Clause(v1, true, undefined);
            c.or(v2).or(v3);
            // we don't need the whole set of variables here.
            var valuation = new Valuation(new Map());
            // in the clause it is "not(v1)"
            valuation.putSolution(v1, false);
            valuation.putSolution(v2, false);
            valuation.putSolution(v3, false);
            assert.equal(true, c.evaluate(valuation));
        });

        it('should return false if all literals have been assigned with a false value.', function() {
            var v1 = {};
            var v2 = {};
            var v3 = {};
            var c = new Clause(v1, false, undefined);
            c.or(v2).or(v3);
            // we don't need the whole set of variables here.
            var valuation = new Valuation(new Map());
            valuation.putSolution(v1, false);
            valuation.putSolution(v2, false);
            valuation.putSolution(v3, false);
            assert.equal(false, c.evaluate(valuation));
        });
    });

    describe('#unitPropagate', function() {
        it('should modify the valuation and assign v1 the false truth value', function() {
            var v1 = {};
            var v2 = {};
            var v3 = {};
            var c = new Clause(v1, true, undefined);
            c.or(v2).or(v3);
            // we don't need the whole set of variables here.
            var valuation = new Valuation(new Map());
            valuation.putSolution(v2, false);
            valuation.putSolution(v3, false);
            assert.equal(undefined, c.evaluate(valuation));
            c.unitPropagate(valuation);
            assert.equal(false, valuation.getSolution(v1));
            assert.equal(true, c.evaluate(valuation));
        });
    });

    describe('#or and #orNot', function() {
        it('should always evaluate to true is clause is x | -x', function() {
            var x = {};
            var c = new Clause(x, false, undefined).orNot(x);
            assert.equal(true, c.evaluate(undefined));
        });
    });

});
