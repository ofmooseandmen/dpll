//
// A literal is either a variable, then called positive literal, or the negation of a variable, then called negative literal.
//
// ## Source code
//
// Constructor - takes a `variable` and a `boolean` as input.
//
function Literal(aVariable, negation) {

	'use strict';

	// the `variable` associated to this literal.
    var variable = aVariable;
    
    // `true` if this is a negative literal.
    var neg = negation;
    
    // `true` if the `variable` implements the equals function.
    var hasEquals = typeof variable.equals === 'function';

	//
	// Returns `true` if this is a negative literal, `false` if this is a positive literal.
	//
    this.isNegative = function() {
        return neg;
    };

    //
	// Returns `true` if this is a positive literal, `false` if this is a negative literal.
	//
    this.isPositive = function() {
        return !this.isNegative();
    };

	//
	// Returns the `variable` associated to this literal.
	//
    this.variable = function() {
        return variable;
    };

	//
	// Returns `true` if `o` and this literal are equals:
	//
	// - this and other literal are of the same kind - i.e. both negative or positive
	// - this and other literal associated variables are equals - using `equals` if available or `===` otherwise
	//
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

	//
	// Evaluate the literal against the specified `boolean` `value`.
	//
    this.evaluate = function(value) {
        if (negation) {
            return !value;
        } else {
            return value;
        }
    };
}

// expose API to Node.js
module.exports = Literal; 