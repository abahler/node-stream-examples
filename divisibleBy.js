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
    
    // console.log('chunk: ', chunk);
    var jsonChunk = chunk.toJSON();
    // console.log('test: ', test);
    // console.log('test bracket data: ', test['data']);
    console.log('this dot d: ', this.d);    // Can see this.d === 4
    var divisor = this.d;
    var arrOfRandoms = jsonChunk['data'];
    var filtered = arrOfRandoms.filter(function(v, i){
        if (v % divisor === 0) {
            return v;
        }
    });
    console.log('filtered: ', filtered);
    
    // Put filtered array back inside buffer
    var buf = new Buffer(filtered);
    this.push(buf);
    this.push(null);
    
    callback();
};

module.exports = DivisibleBy;