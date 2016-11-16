// divisibleBy.js
// From "Try It!" section: an example of a Transform stream
// Keeps only the numbers that are divisible by `d`

var stream = require('stream');

// `d` is number to use as divisor
function DivisibleBy(d) {
    stream.Transform.call(this, d);
    this.d = d;
    this._value = null;     // Holds value of current number
}

// Sets NumberGen.prototype to the obj, but loses correct context of 'this'
DivisibleBy.prototype = Object.create(stream.Transform.prototype);
// Sets constructor back to NumberGen
DivisibleBy.prototype.constructor = DivisibleBy;

// Must implement the _transform() method
DivisibleBy.prototype._transform = function(chunk, encoding, callback) {
    // TODO: Get list of numbers from the Buffer passed from the Readable
    
    // For each `n` number in Buffer: if n % d === 0, add to buffer.
    if (this.value % this.d === 0) {
        if (!this._value) {
            this._value = chunk;
        } else {    
            this._value = Buffer.concat([this._value, chunk]);
        }
    }
    callback();
};

module.exports = DivisibleBy;