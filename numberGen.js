// number.js
// From "Try It!" section: an example of a Readable stream
// It generates a list of `size` random numbers, to be provided to a Transform stream

var stream = require('stream');

function NumberGen(size) {
    stream.Readable.call(this, size);
    this.size = size;
    this.index = 0;     // Initialize to zero, will increase until `size` is reached
}

// Sets NumberGen.prototype to the obj, but loses correct context of 'this'
NumberGen.prototype = Object.create(stream.Readable.prototype);
// Sets constructor back to NumberGen
NumberGen.prototype.constructor = NumberGen;

// _read method is called whenever data is required from the Readable
NumberGen.prototype._read = function() {
    var buf = Buffer.alloc(this.size);
    // buf.writeInt8(randomNum, this.index);
    // TODO: think about replacing for-loop with a map() or forEach() call
    //   (might not be appropriate since you're not doing something to each item in an existing array)
    for (var i = 0; i < this.size; i++) {
        var randomNum = Math.round((Math.random() * 100) + 1);  // Generate a number between 0 and 100
        buf.writeInt8(randomNum, i);
    }
    this.push(buf);
    // this.push(buf);
    // this.index++;
    /*
    if (this.index === this.size) {
        // Indicate data has ended
        this.push(null);
    }*/
    this.push(null);
};

module.exports = NumberGen;