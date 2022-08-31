// function changeMinusSignSide(numString) {
//   numString = numString.split('');
//   if (numString[0] === '-') {
//     numString.push(numString[0]);
//     numString.shift();
//     return numString.join('');
//   } else {
//     return numString.join('');
//   }
// }

// const t0 = performance.now();
// changeMinusSignSide('1.0e-14');
// const t1 = performance.now();
// console.log((t1 - t0).toFixed(3) + 'ms');
// console.log(changeMinusSignSide('1.0e-14'));


function roundIfTooBig(number) {
  const numArray = number.split('');
  if (numArray.includes('e')) {
    number = Number(number);
    return number.toPrecision(2);
  } else if (numArray.length > 16) {
    number = Number(number);
    number = number.toPrecision(16);
    const newNumArray = String(number.split(''));
    if (newNumArray.includes('e')) {
      number = Number(number);
      return number.toPrecision(2);
    } else {
      return number;
    }
  } else {
    return number;
  }
}

const t0 = performance.now();
roundIfTooBig('1.331221e-14');
const t1 = performance.now();
console.log((t1 - t0).toFixed(3) + 'ms');
console.log(roundIfTooBig('1.331221e-14'));
