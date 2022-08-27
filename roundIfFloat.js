function roundIfBigFloat(number) {
  if (number % 1 === 0) {
    return number;
  } else {
    const numberString = '' + number;
    const wholeLength = numberString.indexOf('.') + 1;
    const decimalLength = numberString.length - wholeLength;
    if (decimalLength === 16) {
      return Number(number.toFixed(5));
    } else {
      return number;
    }
  }
}

console.log(roundIfBigFloat(1.8900000000000001)); 