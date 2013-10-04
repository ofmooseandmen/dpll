var assert = require('assert');
var Literal = require('../src/Literal.js');

describe('Literal', function() {
    describe('isNegative', function() {
        it('should return false if Literal constructed with negation = false, true otherwise', function() {
            assert.equal(false, new Literal({}, false).isNegative());
            assert.equal(true, new Literal({}, true).isNegative());
        });
    });

    describe('isPositive', function() {
        it('should return true if Literal constructed with negation = false, false otherwise', function() {
            assert.equal(true, new Literal({}, false).isPositive());
            assert.equal(false, new Literal({}, true).isPositive());
        });
    });

    describe('equals', function() {
        it('should return true if called with same instance', function() {
            var l = new Literal({}, false);
            assert.equal(true, l.equals(l));
        });

        it('should return true if other instance contains same instance of variable and same negation value', function() {
            var v = {};
            var l = new Literal(v, false);
            var o = new Literal(v, false);
            assert.equal(true, l.equals(o));
        });

        it('should return true if variable.equals(this.variable) returns true and same negation value', function() {
            var v1 = {
                name : 'first',
                equals : function(other) {
                    return this.name === other.name;
                }

            };
            var v2 = {
                name : 'first',
                equals : function(other) {
                    return this.name === other.name;
                }

            };
            var l = new Literal(v1, false);
            var o = new Literal(v2, false);
            assert.equal(true, l.equals(o));
        });

        it('should return false if other instance contains different negation value', function() {
            var v = {};
            var l = new Literal(v, false);
            var o = new Literal(v, true);
            assert.equal(false, l.equals(o));
        });

        it('should return false if other instance contains different instance of variable', function() {
            var l = new Literal({}, true);
            var o = new Literal({}, true);
            assert.equal(false, l.equals(o));
        });

        it('should return false equals if variable.equals(this.variable) returns false', function() {
            var v1 = {
                name : 'first',
                equals : function(other) {
                    return this.name === other.name;
                }

            };
            var v2 = {
                name : 'second',
                equals : function(other) {
                    return this.name === other.name;
                }

            };
            var l = new Literal(v1, false);
            var o = new Literal(v2, false);
            assert.equal(false, l.equals(o));
        });

    });

    describe('evaluate', function() {
        it('should return true if value is true and negation if false', function() {
            assert.equal(true, new Literal({}, false).evaluate(true));
        });

        it('should return true if value is false and negation if true', function() {
            assert.equal(true, new Literal({}, true).evaluate(false));
        });

        it('should return false if value is false and negation if false', function() {
            assert.equal(false, new Literal({}, false).evaluate(false));
        });

        it('should return false if value is true and negation if true', function() {
            assert.equal(false, new Literal({}, true).evaluate(true));
        });

    });

});
