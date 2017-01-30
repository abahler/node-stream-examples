// From "Try It!" section: an example of a Readable stream
// It generates a list of `size` random numbers, to be provided to a Transform stream

var stream = require('stream');

function NumberGen(size) {
    stream.Readable.call(this, size);
    this.size = size;
}

// Sets NumberGen.prototype to the obj, but loses correct context of 'this'
NumberGen.prototype = Object.create(stream.Readable.prototype);
// Sets constructor back to NumberGen to reset `this` context
NumberGen.prototype.constructor = NumberGen;

// _read method is called whenever data is required from the Readable
NumberGen.prototype._read = function() {

    var arrOfRandoms = [];
    for (var i = 0; i < this.size; i++) {
        var randomNum = Math.round((Math.random() * 100) + 1);  // Generate a number between 0 and 100
        arrOfRandoms.push(randomNum);
    }
    
    var buf = new Buffer(arrOfRandoms);
    this.push(buf);
    this.push(null);
};

module.exports = NumberGen;