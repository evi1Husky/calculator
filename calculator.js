/* 
  Calculator Object
  Receive input from user with numInput method and store it as an array in
numberInput property. Use operator methods to convert user input array into a
number and push it to numberArray that holds result value of the previous
calculation with the initial value set to null.
  Use calculate() method inside operator methods with arithmetic operator
argument to calculate a new value. Push calculation results into
calculatorOutput array to display results. Change boolean values to deactivate
methods such as decimalInput() to prevent user from inserting multiple symbols
as well as to empty the input and output arrays and allow for a new number
input.
*/

const calculator = {
  numberInput: [0], // stores user input
  numberArray: [null], // holds two numeric values for calculation
  calculatorOutput: [0], // displays calculation results
  decimalPointInserted: false, // to prevent inserting multiple decimals
  calculated: false, // turn off operator buttons after each calculation
  operatorMethodCalled: false, // disable equal button if false
  operatorUsed: '+', // passed as an argument to calculate() method
  /* clear output array after every calculation.
  Prevent entering multiple zeroes before other numbers or decimal point */

  numInput(num) {
    if (this.calculated) {
      this.calculatorOutput.length = 0;
      this.calculated = false;
    }
    if (!this.decimalPointInserted && this.numberInput[0] === 0) {
      this.numberInput.shift();
      this.calculatorOutput.shift();
    }
    this.numberInput.push(num);
    this.calculatorOutput.push(num);
    this.operatorMethodUsed = false;
  },

  add() {
    if (!this.calculated) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate(this.operatorUsed);
    }
    this.operatorUsed = '+';
    this.operatorMethodUsed = true;
  },

  multiply() {
    if (!this.calculated) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate(this.operatorUsed);
    }
    this.operatorUsed = '*';
    this.operatorMethodUsed = true;
  },

  subtract() {
    if (!this.calculated) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate(this.operatorUsed);
    }
    this.operatorUsed = '-';
    this.operatorMethodUsed = true;
  },

  divide() {
    if (!this.calculated) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate(this.operatorUsed);
    }
    this.operatorUsed = '/';
    this.operatorMethodUsed = true;
  },

  calculate(operator) {
    let resultNumber = null;
    if (operator === '+') {
      resultNumber = this.numberArray[0] + this.numberArray[1];
    }
    if (operator === '*') {
      resultNumber = this.numberArray[0] * this.numberArray[1];
    }
    if (operator === '-') {
      resultNumber = this.numberArray[0] - this.numberArray[1];
    }
    if (operator === '/') {
      resultNumber = this.numberArray[0] / this.numberArray[1];
    }
    this.numberArray.length = 0;
    this.numberArray.push(resultNumber);
    this.calculatorOutput.length = 0;
    this.calculatorOutput.push(resultNumber);
    this.calculated = true;
    this.decimalPointInserted = false;
  },

  equal() {
    if (!this.operatorMethodCalled && !this.calculated) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.calculate(this.operatorUsed);
      this.numberInput.length = 0;
      this.operatorMethodUsed = true;
    }
  },

  decimalInput() {
    if (!this.decimalPointInserted && !this.calculated) {
      this.numberInput.push('.');
      this.calculatorOutput.push('.');
      this.decimalPointInserted = true;
    }
  },

  clear() {
    this.numberInput = [0];
    this.numberArray = [null];
    this.calculatorOutput = [0];
    this.memoryArray = [0];
    this.decimalPointInserted = false;
    this.calculated = false;
    this.operatorMethodUsed = false;
    this.operatorUsed = '+';
  },

  plusMinus() {
    if (this.numberInput[0] !== '-' && !this.calculated) {
      this.numberInput.unshift('-');
      this.calculatorOutput.unshift('-');
    } else if (this.numberInput[0] === '-' && !this.calculated) {
      this.numberInput.shift();
      this.calculatorOutput.shift();
    }
  },

  backSpace() {
    if (this.numberInput.length !== 0) {
      this.numberInput.pop();
      const symbol = this.calculatorOutput.pop();
      if (symbol === '.') {
        this.decimalPointInserted = false;
      }
      if (this.numberInput.length === 0) {
        this.numberInput.push(0);
        this.calculatorOutput.push(0);
      }
    }
  },
};

/*
  Adjust font size proportionally to the string length to fit long numbers 
  screens with limited width.
*/

const stringSizeLimiter = {
  stringLength: 14, //string length after which the font size starts decreasing
  fontSize: 2.8, //font size in rem units set in the stylesheet file
  minimumFontSize: 0, //decrease font size until this value is reached
  elementId: 'displayPrimary', //id of an element that holds font size property
  length: 14,
  size: 2.8,
  adjust: 3.3,

  adjustFontSize(stringArray) {
    const cssFont = document.getElementById(this.elementId);
    if (
      stringArray.length > this.stringLength &&
      this.fontSize > this.minimumFontSize
    ) {
      this.fontSize -= this.fontSize / this.stringLength;
      this.stringLength += 1;
    }
    cssFont.style.fontSize = this.fontSize + 'rem';
  },

  // reverse for the backspace calculator method

  fontSizeReverse(stringArray) {
    const cssFont = document.getElementById(this.elementId);
    if (stringArray.length > 0) {
      this.fontSize += this.fontSize / stringArray.length;
    }
    cssFont.style.fontSize = this.fontSize + 'rem';
    if (stringArray.length <= this.length) {
      this.stringSizeReset();
    }
  },

  stringSizeReset() {
    this.stringLength = this.length;
    this.fontSize = this.size;
    const cssFont = document.getElementById(this.elementId);
    cssFont.style.fontSize = this.fontSize + 'rem';
  },

  // one time font size adjustment for the calculation result string

  toFixedStringSize(stringArray) {
    let adjust = this.adjust;
    const string = String(stringArray[0]);
    if (string.includes('e')) {
      adjust -= 0.3;
    }
    if (string.includes('-')) {
      adjust -= 0.2;
    }
    if (string.includes('.')) {
      adjust += 0.1;
    } if (string.length === 24) {
      adjust -= 0.2;
    }
    const cssFont = document.getElementById(this.elementId);
    this.stringLength = this.length;
    if (string.length >= this.stringLength) {
      this.fontSize -=
        ((this.fontSize / string.length) * string.length) / adjust;
      cssFont.style.fontSize = this.fontSize + 'rem';
    }
    this.fontSize = this.size;
  },
};

// adjust maximum string length for different displays

if (window.screen.width > 450) {
  stringSizeLimiter.fontSize = 2;
  stringSizeLimiter.size = 2;
  stringSizeLimiter.stringLength = 15;
  stringSizeLimiter.length = 15;
}
if (window.screen.width < 450) {
  stringSizeLimiter.stringLength = 15;
  stringSizeLimiter.length = 15;
}
if (window.screen.width < 400) {
  stringSizeLimiter.stringLength = 14;
  stringSizeLimiter.length = 14;
  stringSizeLimiter.adjust = 3;
}
if (window.screen.width < 370) {
  stringSizeLimiter.stringLength = 13;
  stringSizeLimiter.length = 13;
  stringSizeLimiter.adjust = 2.8;
}

/*
  Assign event listeners to all calculator elements inside an immediately called
function.
  Clicking a button displays content of the calculatorOutput array in addition
to calling one of the calculator and string resizing methods.
*/

(() => {
  /* change the minus sign direction when displaying numbers on the
  calculator screen with rtl text direction */

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

  /*Change text display direction temporarily when inserting the '.' bidi
  symbol to display it on the left side using 'direction' property. */

  const primaryDisplay = document.getElementById('displayPrimary');
  primaryDisplay.innerHTML = '0';
  let button = document.getElementById('numButtonPoint');
  button.addEventListener('click', () => {
    if (!calculator.calculated) {
      primaryDisplay.style.direction = 'ltr';
      calculator.decimalInput();
      primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
      stringSizeLimiter.adjustFontSize(calculator.calculatorOutput);
    }
  });
  button = document.getElementById('addButton');
  button.addEventListener('click', () => {
    stringSizeLimiter.stringSizeReset();
    primaryDisplay.style.direction = 'ltr';
    calculator.add();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
    stringSizeLimiter.toFixedStringSize(calculator.calculatorOutput);
  });
  button = document.getElementById('multiplyButton');
  button.addEventListener('click', () => {
    stringSizeLimiter.stringSizeReset();
    primaryDisplay.style.direction = 'ltr';
    calculator.multiply();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
    stringSizeLimiter.toFixedStringSize(calculator.calculatorOutput);
  });
  button = document.getElementById('subtractButton');
  button.addEventListener('click', () => {
    stringSizeLimiter.stringSizeReset();
    primaryDisplay.style.direction = 'ltr';
    calculator.subtract();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
    stringSizeLimiter.toFixedStringSize(calculator.calculatorOutput);
  });
  button = document.getElementById('divideButton');
  button.addEventListener('click', () => {
    stringSizeLimiter.stringSizeReset();
    primaryDisplay.style.direction = 'ltr';
    calculator.divide();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
    stringSizeLimiter.toFixedStringSize(calculator.calculatorOutput);
  });
  button = document.getElementById('equalButton');
  button.addEventListener('click', () => {
    stringSizeLimiter.stringSizeReset();
    primaryDisplay.style.direction = 'ltr';
    calculator.equal();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
    stringSizeLimiter.toFixedStringSize(calculator.calculatorOutput);
  });
  button = document.getElementById('clearButton');
  button.addEventListener('click', () => {
    calculator.clear();
    stringSizeLimiter.stringSizeReset();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
  button = document.getElementById('plusMinusButton');
  button.addEventListener('click', () => {
    if (!calculator.calculated) {
      primaryDisplay.style.direction = 'ltr';
      primaryDisplay.innerHTML = changeMinusSignSide(
        calculator.calculatorOutput.join('')
      );
      calculator.plusMinus();
      primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
      stringSizeLimiter.adjustFontSize(calculator.calculatorOutput);
    }
  });
  button = document.getElementById('backSpaceButton');
  button.addEventListener('click', () => {
    if (!calculator.calculated) {
      primaryDisplay.style.direction = 'ltr';
      primaryDisplay.innerHTML = changeMinusSignSide(
        calculator.calculatorOutput.join('')
      );
      calculator.backSpace();
      primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
      stringSizeLimiter.fontSizeReverse(calculator.calculatorOutput);
    }
  });

  /* Use a for loop to repeatedly assign num pad event listeners by changing
  the last index of the num button id string. */

  let numButton = 'numButton0';
  button = document.getElementById(numButton);
  let buttonIdNumber = 0;
  for (let numButtonCount = 0; numButtonCount <= 9; ++numButtonCount) {
    button.addEventListener('click', () => {
      primaryDisplay.style.direction = 'rtl';
      calculator.numInput(numButtonCount);
      primaryDisplay.innerHTML = changeMinusSignSide(
        calculator.calculatorOutput.join('')
      );
      stringSizeLimiter.adjustFontSize(calculator.calculatorOutput);
    });
    buttonIdNumber += 1;
    button = document.getElementById(numButton.slice(0, -1) + buttonIdNumber);
  }
})();
