// tryIt.js:
// Procedural code that implements the custom streams NumberGen, DivisibleBy, and Logger

// console.log(global);
"use strict";

var Person = {
    age: 30,
    name: 'Something'
};

var bob = Object.create(Person);

var firstOne = 'something';
var secondOne = 'neww';
Person = {firstOne, secondOne};
console.log(Person);

// Add a new method for all Person objects
// Person.prototype.newMethod = function(foo){
//     console.log("Do something with " + foo);
// };

var arr = ['moe', 'larry', 'curly'];
var [a, b] = arr;
console.log(a);
console.log(b);

// Can set default values if you use a function constructor (`function Person()`)

/*

var NumberGen = require('./numberGen');
var DivisibleBy = require('./divisibleBy');
var Logger = require('./logger');
var numGen = new NumberGen(101);    // As with NumberGen's Buffer instance, you need space for 100 values plus one null
var divvy = new DivisibleBy(4); 
var logger = new Logger();

// numGen.pipe(divvy).pipe(logger);
numGen.pipe(logger);

logger.on('finish', function() {
    console.log('Logger store: ');
    console.log(Logger.store);
});
*/