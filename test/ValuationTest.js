var assert = require('assert');
var Map = require('../src/Map.js');
var Valuation = require('../src/Valuation.js');

describe('Valuation', function() {
    describe('#randomUnassignedVariable()', function() {
        it('should return at random a variable amongst those unassigned', function() {
            var a = {};
            var b = {};
            var c = {};
            var d = {};
            var e = {};
            var vars = new Map();
            vars.put(a, 1);
            vars.put(b, 1);
            vars.put(c, 1);
            vars.put(d, 1);
            vars.put(e, 1);
            var valuation = new Valuation(vars);
            valuation.putSolution(a, true);
            valuation.putSolution(b, true);
            var random = valuation.randomUnassignedVariable();
            assert.equal(false, random === undefined);
            assert.equal(false, random === a);
            assert.equal(false, random === b);
        });
    });
    
    describe('#highestOccurrenceVariable()', function() {
        it('should return the unassigned variable with the higest occurrence', function() {
            var a = {};
            var b = {};
            var c = {};
            var d = {};
            var e = {};
            var vars = new Map();
            vars.put(a, 5);
            vars.put(b, 1);
            vars.put(c, 4);
            vars.put(d, 2);
            vars.put(e, 3);
            var valuation = new Valuation(vars);
            valuation.putSolution(a, true);
            valuation.putSolution(b, true);
            var highest = valuation.highestOccurrenceVariable();
            assert.equal(true, highest === c);
        });
    });

});
