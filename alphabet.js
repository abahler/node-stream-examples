// alphabet.js: Implementation of the Readable interface
// Creates source data by emitting each letter of the alphabet

var stream = require('stream');

// Output letters from a-z
function Alphabet(options) {
    stream.Readable.call(this, options);
    this._start = 'a';
    this._end = 'z';
    this._curr = this._start.charCodeAt(0); // Take _start ('a') and get the ASCII code which is 97.
}

// Sets Alphabet.prototype to the obj, but loses correct context of 'this'
Alphabet.prototype = Object.create(stream.Readable.prototype);

// Sets constructor back to alphabet
Alphabet.prototype.constructor = Alphabet;

// _read method is called whenever data is required from the Readable
Alphabet.prototype._read = function() {
    var letter = String.fromCharCode(this._curr);
    var buf = new Buffer(letter, 'utf8');
    this.push(buf);     // This will trigger the `data` event
    this._curr++;       // Increase to 98, then 99, then 100...
    if (letter === this._end) {
        // Tell the buffer that the data has ended
        this.push(null);
    }
};

module.exports = Alphabet;