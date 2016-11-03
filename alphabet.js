// alphabet.js: Implementation of the Readable interface
// Creates source data by emitting each letter of the alphabet

var stream = require('stream');

// Output letters from a-z
function Alphabet(options) {
    stream.Readable.call(this, options);
    this._start = 'a';
    this._end = 'z';
    this._curr = this._start.charCodeAt(0);
}

Alphabet.prototype = Object.create(stream.Readable.prototype);
Alphabet.prototype.constructor = Alphabet;

Alphabet.prototype._read = function() {
    var letter = String.fromCharCode(this._curr);
    var buf = new Buffer(letter, 'utf8');
    this.push(buf);     // This will trigger the `data` event
    this._curr++;
    if (letter === this._end) {
        this.push(null);
    }
};

module.exports = Alphabet;