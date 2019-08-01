const fs = require("fs");
const thru = require("through2");
const split = require("split");
const path = require("path");
const _ = require("lodash");

const INPUT = "./input/6.txt";

var processed = [];
// process
fs
  .createReadStream(INPUT)
  .pipe(split())
  .on("data", function(data) {
    processed = _.map(
      data
        .toString()
        .trim()
        .split("	"),
      function(val) {
        return parseInt(val);
      }
    );
  })
  .on("end", function(line) {
    const NS_PER_SEC = 1e9;
    const time = process.hrtime();
    var output = mainAdvent(processed);
    const diff = process.hrtime(time);
    console.log("RESULT: ", output);
    console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
  })
  .on("error", function(err) {
    console.error("derp: ", err);
  });

function mainAdvent(initialMemoryBank) {
  // initialMemoryBank = [0, 2, 7, 0];
  console.log("initialMemoryBank", initialMemoryBank);
  var memoryBank = initialMemoryBank;
  var memoryBankHistory = [];
  var redistCycle = 0;
  var maxIndex = 0;
  var shareIndex = 0;
  var shareChunk = 0;

  while (
    memoryBankHistory.indexOf(_.join(memoryBank, ",")) === -1 &&
    redistCycle < 100000
  ) {
    memoryBankHistory.push(_.join(memoryBank, ","));

    maxIndex = _.indexOf(memoryBank, _.max(memoryBank));
    shareChunk = _.nth(memoryBank, maxIndex);
    memoryBank[maxIndex] = 0;
    shareIndex = maxIndex + 1;

    while (shareChunk > 0) {
      if (shareIndex >= memoryBank.length) {
        shareIndex = 0;
      }

      memoryBank[shareIndex] += 1;

      shareIndex++;
      shareChunk--;
    }

    redistCycle++;
  }
  // console.log("memoryBank: ", memoryBank);
  // console.log("redistCycle: ", redistCycle);
  // console.log("memoryBankHistory: ", memoryBankHistory);
  // console.log("matching index: ", memoryBankHistory.indexOf(_.join(memoryBank, ",")));

  return redistCycle - memoryBankHistory.indexOf(_.join(memoryBank, ","));
}
