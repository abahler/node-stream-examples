// logger.js 
// From "Try It!" section: an example of a Writable stream
// Logs buffer to console (once this is working, have it write to a file)

var stream = require('stream');

function Logger(options) {
    stream.Writable.call(this, options);
    this._value = null;
    this.on('finish', function() {
        // Only log the full list when it is finished writing, 
        // so a user doesn't try to grab an incomplete list
        Logger.store.push(this._value);
    });
}

Logger.store = [];   // Exists outside of any single lowercase-c `Logger` object
Logger.prototype = Object.create(stream.Writable.prototype);
Logger.prototype.constructor = Logger;

// The _write method is called when data is supplied to the stream
// `chunk` is the actual data. `encoding` only needs to be passed as a 2nd arg if chunk is a String
Logger.prototype._write = function(chunk, callback) {
    if (!this._value) { // If this is the first iteration of the write, _value will be null (its initial value)
        this._value = chunk;
    } else {    // Otherwise, add chunk onto the end of `_value`
        // Note the use of concat(), because += would coerce the value into a String
        this._value = Buffer.concat([this._value, chunk]);
    }
    // Nothing passed into callback means it was a successful write. 
    // If error object is passed in, then error event on the stream will be triggered
    callback();
};

module.exports = Logger;