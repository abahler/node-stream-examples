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

DivisibleBy.prototype = Object.create(stream.Transform.prototype);
DivisibleBy.prototype.constructor = DivisibleBy;

// Must implement the _transform() method
DivisibleBy.prototype._transform = function(chunk, encoding, callback) {
    // TODO: Get list of numbers from the Buffer passed from the Readable
    //  How many numbers are passed per chunk? This code shouldn't have to know that, right?
    
    console.log('chunk: ', chunk);
    var test = JSON.stringify(chunk);
    console.log('test: ', test);

    if (this.value % this.d === 0) {
        /*
        if (!this._value) {
            this._value = chunk;
        } else {    
            this._value = Buffer.concat([this._value, chunk]);
        }
        */
        this.push(chunk);
    }
    callback();
};

module.exports = DivisibleBy;