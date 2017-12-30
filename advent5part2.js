const fs = require('fs');
const thru = require('through2');
const split = require('split');
const path = require('path');
const _ = require('lodash');

const INPUT = './input/5.txt';

const processed = [];
// process
fs.createReadStream(INPUT)
  .pipe(split())
  .pipe(thru(function(buf, _, cb) {
    var line = buf.toString().trim();
    this.push(line);
    cb();
  }))
  .on('data', function (data) {
    processed.push(parseInt(data.toString()));
  })
  .on('end', function(line) {
    const NS_PER_SEC = 1e9;
    const time = process.hrtime();
    var output = mainAdvent(processed);;
    const diff = process.hrtime(time);
    console.log('RESULT: ', output);
    console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
  })
  .on('error', function(err) {
    console.error('derp: ', err);
  });

function mainAdvent (program) {
  // program = [0, 3, 0, 1, -3]; // Test input

  var memory = program;
  var pc = 0;
  var oldpc;
  var steps = 0;
  while(_.inRange(pc, memory.length)) {
    steps++;
    oldpc = pc;
    pc += memory[pc];
    if(memory[oldpc] >= 3){
      memory[oldpc]--;
    } else {
      memory[oldpc]++;
    }
  }
  return steps;
}





