// logger.js 
// From "Try It!" section: an example of a Writable stream
// Logs buffer to console (once this is working, it will be modified to write to a file)

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

Logger.prototype._write = function(chunk, encoding, callback) {
    if (!this._value) { // If this is the first iteration of the write, _value will be null (its initial value)
        this._value = chunk;
    } else {    // Otherwise, add chunk onto the end of `_value`
        this._value = Buffer.concat([this._value, chunk]);
    }
    callback();
};

module.exports = Logger;