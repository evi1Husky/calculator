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


// function roundIfTooBig(number) {
//   if (number.split('').length > 15) {
//     number = Number(number);
//     let newNumber = String(number);
//     if (newNumber.split('').length > 15) {
//       newNumber = Number(newNumber);
//       return newNumber.toPrecision(10);
//     }
//     return number.toPrecision(15);
//   } else {
//     return number;
//   }
// }

// const t0 = performance.now();
// roundIfTooBig('999988900011100000');
// const t1 = performance.now();
// console.log((t1 - t0).toFixed(4) + 'ms');
// console.log(roundIfTooBig('999988900011100000'));

