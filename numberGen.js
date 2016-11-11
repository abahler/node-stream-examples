// number.js
// From "Try It!" section: an example of a Readable stream
// It generates a list of `n` random numbers, to be provided to a Transform stream

var stream = require('stream');

function NumberGen(size) {
    stream.Readable.call(this, size);
    this.size = size;
    this.index = 0;
}

// Sets NumberGen.prototype to the obj, but loses correct context of 'this'
NumberGen.prototype = Object.create(stream.Readable.prototype);

// Sets constructor back to NumberGen
NumberGen.prototype.constructor = NumberGen;

// _read method is called whenever data is required from the Readable
NumberGen.prototype._read = function() {
    var bufInit = new Buffer(101);  // When passing a #, need to pass size of buffer. 101 = 100 plus null value
    var buf = Buffer.from(bufInit);
    this.push(buf);
    this.index++;
    if (this.index === this.size) {
        // Indicate data has ended
        this.push(null);
    }
};

module.exports = NumberGen;