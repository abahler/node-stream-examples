// number.js
// From "Try It!" section: an example of a Readable stream
// It generates a list of `n` random numbers, to be provided to a Transform stream

var stream = require('stream');

// Output letters from a-z
function NumberGen(options) {
    stream.Readable.call(this, options);
    this._start = 'a';
    this._end = 'z';
    this._curr = this._start.charCodeAt(0); // Take _start ('a') and get the ASCII code which is 97.
}

// Sets NumberGen.prototype to the obj, but loses correct context of 'this'
NumberGen.prototype = Object.create(stream.Readable.prototype);

// Sets constructor back to NumberGen
NumberGen.prototype.constructor = NumberGen;

// _read method is called whenever data is required from the Readable
NumberGen.prototype._read = function() {
    var letter = String.fromCharCode(this._curr);
    var buf = new Buffer(letter, 'utf8');
    this.push(buf);     // This will trigger the `data` event
    this._curr++;       // Increase to 98, then 99, then 100...
    if (letter === this._end) {
        // Tell the buffer that the data has ended
        this.push(null);
    }
};

module.exports = NumberGen;