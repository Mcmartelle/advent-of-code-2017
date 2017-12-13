var input = 361527;

function spiralOut (targetValue) {
  var currentValue = 1;
  var xCoord = 0;
  var yCoord = 0;
  var directionSequence = ['right', 'up', 'left', 'down'];
  var direction = directionSequence[0];
  var directionCount = 0
  var edgeLength = 1;
  var edgeCount = 0;
  
  
  while (true) {
    if (currentValue === targetValue){
      return Math.abs(xCoord) + Math.abs(yCoord);
    }
    //console.log('currentValue', currentValue);
    //console.log('edgeLength', edgeLength);
    //console.log('edgeCount', edgeCount);
    //console.log('directionCount', directionCount);
    //console.log('direction', direction);
    //console.log('xCoord', xCoord);
    //console.log('yCoord', yCoord);
    //console.log('-------');
    
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

      if(currentValue + edgeLength < targetValue){
        switch (direction) {
          case 'right':
            xCoord + edgeLength;
            break;
          case 'up':
            yCoord + edgeLength;
            break;
          case 'left':
            xCoord - edgeLength;
            break;
          case 'down':
            yCoord - edgeLength;
            break;
        }
      }
    }
    
    currentValue++;
  }
}

const NS_PER_SEC = 1e9;
const time = process.hrtime();
var output = spiralOut(input);
const diff = process.hrtime(time);
console.log('RESULT: ', output);
console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
