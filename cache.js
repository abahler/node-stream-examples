// cache.js: Implementation of the Writeable interface
// Creates a simple in-memory cache

var stream = require('stream');

function Cache(key, options) {
    stream.Writable.call(this, options);
    this._key = key;
    this._value = null;
    this.on('finish', function() {
        // Only add the value to the cache when it is finished writing, 
        // so a user doesn't try to grab an incomplete entry
        Cache.store[this._key] = this._value;
    });
}

Cache.store = {};   // Exists outside of any single lowercase-c `cache` object
Cache.prototype = Object.create(stream.Writable.prototype);
Cache.prototype.constructor = Cache;

// The _write method is called when data is supplied to the stream
// `chunk` is the actual data. `encoding` only needs to be passed if chunk is a String
Cache.prototype._write = function(chunk, encoding, callback) {
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

module.exports = Cache;