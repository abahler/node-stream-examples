// cache.js: Implementation of the Writeable interface
// Creates a simple in-memory cache

var stream = require('stream');

function Cache(key, options) {
    stream.Writable.call(this, options);
    this._key = key;
    this._value = null;
    this.on('finish', function() {
        // Only add the value to the cache when it is finished writing
        Cache.store[this._key] = this._value;
    });
}

Cache.store = {};   // Exists outside of any single lowercase-c `cache` object
Cache.prototype = Object.create(stream.Writable.prototype);
Cache.prototype.constructor = Cache;

// The _write method is called when data is supplied to the stream
Cache.prototype._write = function(chunk, encoding, callback) {
    if (!this._value) {
        this._value = chunk;
    } else {
        this._value = Buffer.concat([this._value, chunk]);
    }
    callback();
};

module.exports = Cache;