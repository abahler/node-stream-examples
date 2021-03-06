// number.js
// From "Try It!" section: an example of a Readable stream
// It generates a list of `size` random numbers, to be provided to a Transform stream

var stream = require('stream');

function NumberGen(size) {
    stream.Readable.call(this, size);
    this.size = size;
}

// Sets NumberGen.prototype to the obj, but loses correct context of 'this'
NumberGen.prototype = Object.create(stream.Readable.prototype);
// Sets constructor back to NumberGen
NumberGen.prototype.constructor = NumberGen;

// _read method is called whenever data is required from the Readable
NumberGen.prototype._read = function() {
    var buf = Buffer.alloc(this.size, 0, 'utf8');
    console.log('Buf: ', buf);

    var arrOfRandoms = [];
    for (var i = 0; i < this.size; i++) {
        var randomNum = Math.round((Math.random() * 100) + 1);  // Generate a number between 0 and 100
        // randomNum = randomNum.toString() + ',';   // buf.write needs a string
        arrOfRandoms.push(randomNum);
        
        console.log('Random number: ', randomNum);
    }
    
    console.log('arrOfRandoms: ', arrOfRandoms);
    var randomStr = arrOfRandoms.join(',');
    // console.log('randomStr: ', randomStr);                   // Shows we get the intended string
    // console.log('randomStr data type: ', typeof randomStr);  // "string"
    buf.write(randomStr, i);     // buf.write() takes string as its first argument
    this.push(buf);
    this.push(null);
};

module.exports = NumberGen;