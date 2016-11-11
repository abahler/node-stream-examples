// tryIt.js:
// Procedural code that implements the custom streams Name, Transform, and Logger
// TODO: include Transform module and create instance. 
//       For now, just make sure the Readable and Writable streams work by piping the former to the latter

var NumberGen = require('./numberGen');
var Logger = require('./logger');
var numGen = new NumberGen(101);    // As with NumberGen's Buffer instance, you need space for 100 values plus one null
var logger = new Logger();

// Pipe data from the alphabet stream into the cache.
// TODO: for now, just pipe it from the Readable to the Writable, but later, you need to implement a Transform stream
numGen.pipe(logger);

logger.on('finish', function() {
    console.log('Logger store: ');
    console.log(Logger.store);
    // TODO: when rewriting Logger to log to a file, print a message that confirms the file was written to
});