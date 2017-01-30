// From "Try It!" section: an example of a Writable stream
// Logs buffer to console (once this is working, it will be modified to write to a file)

var stream = require('stream');

function Logger(options) {
    stream.Writable.call(this, options);
    this._value = null;
    this.on('finish', function() {
        // Only log the full list when it is finished writing, 
        // so a user doesn't try to grab an incomplete list
        Logger.store = this._value;
    });
}
Logger.store = null;   // Exists outside of any single lowercase-c `Logger` object
Logger.prototype = Object.create(stream.Writable.prototype);
Logger.prototype.constructor = Logger;

Logger.prototype._write = function(chunk, encoding, callback) {
    var jsonChunk = chunk.toJSON();

    if (!this._value) { // If this is the first iteration of the write, _value will be null (its initial value)
        this._value = jsonChunk.data;
    } 

    callback();
};

module.exports = Logger;