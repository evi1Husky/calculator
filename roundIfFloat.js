function roundIfTooBig(number) {
  if (number.toString().includes('e')) {
    return number.toPrecision(2);
  }
  if (number % 1 === 0) {
    return number;
  } else {
    const numberString = number.toString();
    const wholeLength = numberString.indexOf('.') + 1;
    const decimalLength = numberString.length - wholeLength;
    if (decimalLength === 16) {
      return Number(number.toFixed(7));
    } else {
      return number;
    }
  }
}

console.log(roundIfTooBig(1.8900000000000001));

console.log(roundIfTooBig(5.132213123213133e+48));