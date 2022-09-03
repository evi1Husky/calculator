function changeMinusSignSide(numString) {
  numString = numString.split('');
  if (numString[0] === '-') {
    numString.push(numString[0]);
    numString.shift();
    return numString.join('');
  } else {
    return numString.join('');
  }
}

const t0 = performance.now();
changeMinusSignSide('1.0e-14');
const t1 = performance.now();
console.log((t1 - t0).toFixed(3) + 'ms');
console.log(changeMinusSignSide('1.0e-14'));
