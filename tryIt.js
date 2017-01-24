// tryIt.js:
// Procedural code that implements the custom streams NumberGen, DivisibleBy, and Logger

var NumberGen = require('./numberGen');
var DivisibleBy = require('./divisibleBy');
var Logger = require('./logger');
var numGen = new NumberGen(101);    // As with NumberGen's Buffer instance, you need space for 100 values plus one null
var divvy = new DivisibleBy(4); 
var logger = new Logger();

// numGen.pipe(divvy).pipe(logger);
numGen.pipe(logger);

logger.on('finish', function() {
    console.log('logger dot store (from tryIt.js): ', logger.store);
});