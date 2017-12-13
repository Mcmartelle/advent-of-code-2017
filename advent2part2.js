const fs = require('fs');
const thru = require('through2');
const split = require('split');
const path = require('path');
const _ = require('lodash');

const INPUT = './input/2.txt';

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
    processed.push(data.toString().split(' '));
  })
  .on('end', function(line) {
    result = MainAdvent(processed);
    console.log("result: ",result);
    console.log('done');
  })
  .on('error', function(err) {
    console.error('derp: ', err);
  });

function MainAdvent (data) {

  return _.reduce(data, function(sum, row){
    var quotient = 0;
    _.forEach(row, function (divisor, index, arr){
      var freshArr = _.clone(arr);
      freshArr.splice(index, 1);
      _.forEach(freshArr, function (numerator){
        if(_.isInteger(numerator/divisor)) {
          quotient = numerator/divisor;
          return;
        }
      });
      if(quotient){
        return;
      }
    });

    return sum + quotient;
  }, 0);
}





