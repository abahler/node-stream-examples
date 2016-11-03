// main.js: Consumer of the readable implementation
// As the convention 'main' implies, this is the procedural code.

var Alphabet = require('./alphabet');
var Cache = require('./cache');
var alpha = new Alphabet();
var cache = new Cache('alpha1');    // 'alpha1' = key that identifies data to be written into the stream
                                    // This will allow us to later retrieve data from Cache.store object
                                    // (which is shared between all Cache objects)

// Pipe data from the alphabet stream into the cache
alpha.pipe(cache);

cache.on('finish', function() {
    console.log('Cache store: ');
    for (var key in Cache.store) {  // Didn't initially work, because you had `cache.store` instead of `Cache.store`
        console.log(key, ':', Cache.store[key]);
    }
});
