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
    
    var jsonChunk = chunk.toJSON();
    var divisor = this.d;   // Need to capture the reference to `this.d` that we won't have within .filter()
    var arrOfRandoms = jsonChunk['data'];
    var filtered = arrOfRandoms.filter(function(v, i){
        if (v % divisor === 0) {
            return v;
        }
    });

    // Put filtered array back inside buffer
    var buf = new Buffer(filtered);
    this.push(buf);
    this.push(null);
    
    callback();
};

module.exports = DivisibleBy;