//
// A literal is either a variable, then called positive literal, or the negation of a variable, then called negative literal.
//
function Literal(aVariable, negation) {

   'use strict';

    var variable = aVariable;
    var neg = negation;
    var hasEquals = typeof variable.equals === 'function';

    this.isNegative = function() {
        return neg;
    };

    this.isPositive = function() {
        return !this.isNegative();
    };

    this.variable = function() {
        return variable;
    };

    this.equals = function(o) {
        if (this.isNegative() === o.isNegative()) {
            if (hasEquals) {
                return variable.equals(o.variable());
            } else {
                return variable === o.variable();
            }
        } else {
            return false;
        }
    };

    this.evaluate = function(value) {
        if (negation) {
            return !value;
        } else {
            return value;
        }
    };
}

module.exports = Literal; 