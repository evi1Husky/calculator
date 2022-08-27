// calculator object
// Recieve a number value from user with numInput method and store it as an
// array in numberInput property.
// Use operator methods to convert user input array into a number 
// and push it into numberArray that holds result value of the previous
// calculation with the initial value set to null.
// Use calculate() method inside operator methods with arithmetic operator
// argument to calculate a new value.
// Push calculation results into calculatorOutput array to display results,
// the html page receives data only from this array.
// Change boolean values to deactivate methods such as decimalInput() to
// prevent user from inserting multiple symbols as well as to empty the input
// and output arrays and allow for a new number input.

const calculator = {
  numberInput: [],
  numberArray: [null],
  calculatorOutput: [],
  decimalPointInserted: false,
  operated: false,
  operatorUsed: '+',

  numInput(num) {
    if (this.operated === true) {
      this.calculatorOutput.length = 0;
      this.operated = false;
    }
    this.numberInput.push(num);
    this.calculatorOutput.push(num);
    this.variables();
  },

  add() {
    if (this.operated === false) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate(this.operatorUsed);
    }
    this.operatorUsed = '+';
    this.variables();
  },

  subtract() {
    if (this.operated === false) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate(this.operatorUsed);
    }
    this.operatorUsed = '-';
    this.variables();
  },

  calculate(operator) {
    let resultNumber = null;
    if (operator === '+') {
      resultNumber = this.numberArray[0] + this.numberArray[1];
    }
    if (operator === '-') {
      resultNumber = this.numberArray[0] - this.numberArray[1];
    }
    this.numberArray.length = 0;
    this.numberArray.push(resultNumber);
    this.calculatorOutput.length = 0;
    this.calculatorOutput.push(this.roundIfTooBig(resultNumber));
    this.operated = true;
    this.decimalPointInserted = false;
  },

  equal() {
    this.numberArray.push(Number(this.numberInput.join('')));
    this.calculate(this.operatorUsed);
    this.numberInput.length = 0;
    this.variables();
  },

  decimalInput() {
    if (this.decimalPointInserted === false && this.operated === false) {
      this.numberInput.push('.');
      this.calculatorOutput.push('.');
      this.decimalPointInserted = true;
      this.variables();
    }
  },

  clear() {
    this.numberInput.length = 0;
    this.numberArray.length = 0;
    this.numberArray.push(null);
    this.calculatorOutput.length = 0;
    this.decimalPointInserted = false;
    this.operated = false;
    this.operatorUsed = '+';
    this.variables();
  },

  roundIfTooBig(number) {
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
  },

  variables() {
    console.clear();
    console.log(`user input: ${this.numberInput.join('')}`);
    console.log(`numbers array: ${this.numberArray}`);
    console.log(`output: ${this.calculatorOutput.join('')}`);
    console.log(`decimal inserted: ${this.decimalPointInserted}`);
    console.log(`operated: ${this.operated}`);
    console.log(`operator used: ${this.operatorUsed}`);
  },
};

// Assign event listeners to all calculator object elements within
// a separate function. Change text display direction temporarily
// when inserting bidi symbols to display them on the right
// side. Use a for loop to automatically assign num pad event listeners
// by changing the last index of the num button id string. Clicking a
// button displays the content of the calculatorOutput array in
// addition to calling one of the calculator object methods.

(() => {
  const primaryDisplay = document.getElementById('displayPrimary');
  let numButton = 'numButton0';
  let button = document.getElementById(numButton);
  let buttonIdNumber = 0;
  for (let numButtonCount = 0; numButtonCount <= 9; ++numButtonCount) {
    button.addEventListener('click', () => {
      calculator.numInput(numButtonCount);
      primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
      primaryDisplay.style.direction = 'rtl';
    });
    buttonIdNumber += 1;
    button = document.getElementById(numButton.slice(0, -1) + buttonIdNumber);
  }
  button = document.getElementById('numButtonPoint');
  button.addEventListener('click', () => {
    primaryDisplay.style.direction = 'ltr';
    calculator.decimalInput();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
  button = document.getElementById('addButton');
  button.addEventListener('click', () => {
    calculator.add();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
  button = document.getElementById('subtractButton');
  button.addEventListener('click', () => {
    calculator.subtract();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
  button = document.getElementById('equalButton');
  button.addEventListener('click', () => {
    calculator.equal();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
  button = document.getElementById('clearButton');
  button.addEventListener('click', () => {
    calculator.clear();
    primaryDisplay.innerHTML = 0;
  });
})();
