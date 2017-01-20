// divisibleBy.js
// From "Try It!" section: an example of a Transform stream
// Keeps only the numbers that are divisible by `d`

var stream = require('stream');

// `d` is number to use as divisor
function DivisibleBy(d) {
    stream.Transform.call(this, d);
    this.d = d;
    this._value = '';     // Holds value of current number
}

DivisibleBy.prototype = Object.create(stream.Transform.prototype);
DivisibleBy.prototype.constructor = DivisibleBy;

// Must implement the _transform() method
DivisibleBy.prototype._transform = function(chunk, encoding, callback) {

    console.log('Chunk (before split):', chunk.toString('utf8'));
    // this._value += chunk.toString('utf8');
    
    var arr = chunk.toString('utf8').split(',');
    console.log('array from chunk: ', arr);
    arr.forEach( (v,i) => {
        // For each `n` number in Buffer: if n % d === 0, add to buffer.
        if ( v && (v % this.d === 0) ) {
            // this._value = Buffer.concat([this._value, chunk]);
            
            console.log('value of `v` (within if inside _transform): ', v);
            this._value += v;
            
        }
    });
    console.log('this dot _value (after foreach): ', this._value);
    this.push(this._value);
    callback();
};

module.exports = DivisibleBy;