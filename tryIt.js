// tryIt.js:
// Procedural code that implements the custom streams NumberGen, DivisibleBy, and Logger

var NumberGen = require('./numberGen');
var DivisibleBy = require('./divisibleBy');
var Logger = require('./logger');
var numGen = new NumberGen(101);    // As with NumberGen's Buffer instance, you need space for 100 values plus one null
var divvy = new DivisibleBy(4); 
var logger = new Logger();

// Pipe data from the number generator stream into the logger.
// TODO: for now, just pipe it from the Readable to the Writable, but later, you need to implement a Transform stream
numGen.pipe(logger);
// Something like: numGen.pipe(divvy.filterByModulo()).pipe(logger);

logger.on('finish', function() {
    console.log('Logger store: ');
    console.log(Logger.store);
    // TODO: when rewriting Logger to log to a file, print a message that confirms the file was written to
});