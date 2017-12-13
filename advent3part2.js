const _ = require('lodash');

var input = 361527;

var testInput = 23; // Should evaluate to 806.

function spiralOut (targetValue) {
  var currentValue = 1;
  var xCoord = 0;
  var yCoord = 0;
  var directionSequence = ['right', 'up', 'left', 'down'];
  var direction = directionSequence[0];
  var directionCount = 0
  var edgeLength = 1;
  var edgeCount = 0;
  var spiralArr = [];

  
  while (true) {
    if (currentValue > targetValue){
      return spiralArr;
    }
    spiralArr.push({x:xCoord, y:yCoord});
    
    switch (direction) {
      case 'right':
        xCoord++;
        break;
      case 'up':
        yCoord++;
        break;
      case 'left':
        xCoord--;
        break;
      case 'down':
        yCoord--;
        break;
    }
    
    edgeCount++;
    if (edgeCount === edgeLength) {
      directionCount++;
      edgeLength += (directionCount+1) % 2;
      edgeCount = 0;
      direction = directionSequence[directionCount % 4];
    }
    
    
    currentValue++;
  }
  
}
function propagateSums (coordinates) {
  var spiralSums = {x0y0: 1};
  var prevSum = 0;
  var currentSum = 0;
  function neighbors8 (coords) {
    return  _.sum([
        _.get(spiralSums, 'x' + (coords.x - 1) + 'y' + (coords.y - 1), 0),
        _.get(spiralSums, 'x' + (coords.x    ) + 'y' + (coords.y - 1), 0),
        _.get(spiralSums, 'x' + (coords.x + 1) + 'y' + (coords.y - 1), 0),
        _.get(spiralSums, 'x' + (coords.x - 1) + 'y' + (coords.y    ), 0),
        _.get(spiralSums, 'x' + (coords.x + 1) + 'y' + (coords.y    ), 0),
        _.get(spiralSums, 'x' + (coords.x - 1) + 'y' + (coords.y + 1), 0),
        _.get(spiralSums, 'x' + (coords.x    ) + 'y' + (coords.y + 1), 0),
        _.get(spiralSums, 'x' + (coords.x + 1) + 'y' + (coords.y + 1), 0)
      ]);
  }
  _.some(coordinates, function(coord, index){
    if(index !== 0){
      currentSum = neighbors8(coord);
      if(currentSum > input) {
        console.log("currentSum...: ",currentSum);
        return true;
      } 
      _.set(spiralSums, 'x' + coord.x + 'y' + coord.y, currentSum);
    }
  });

  return currentSum;
}

function mainAdvent (tarVal) {
  var spiralCoords = spiralOut(tarVal);
  var firstSumLarger = propagateSums(spiralCoords);


  return firstSumLarger;
}

const NS_PER_SEC = 1e9;
const time = process.hrtime();
var output = mainAdvent(input);
const diff = process.hrtime(time);
console.log('RESULT: ', output);
console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);