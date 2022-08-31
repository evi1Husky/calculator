/* 
  Calculator Object
  Recieve input from user with numInput method and store it as an array in
numberInput property. Use operator methods to convert user input array into a
number and push it to numberArray that holds result value of the previous
calculation with the initial value set to null.
  Use calculate() method inside operator methods with arithmetic operator
argument to calculate a new value. Push calculation results into
calculatorOutput array to display results. Change boolean values to deactivate
methods such as decimalInput() to prevent user from inserting multiple symbols
as well as to empty the input and output arrays and allow for a new number input.
*/

const calculator = {

  numberInput: [0],       //stores user input 
  numberArray: [null],   //holds two numeric values for calculation
  calculatorOutput: [0],  //displays calculation results 
  decimalPointInserted: false, //to prevent inserting multiple decimals
  calculated: false,     //to turn off operator buttons after each calculation
  operatorMethodUsed: false,  //disable equal button if false
  operatorUsed: '+',     //passed as an argumant to calculate() method

  /* clear ooutput array after every calculation.
  Prevent entering multiple zeroes before other numbers or decimal point */

  numInput(num) {
    if (this.calculated === true) {
      this.calculatorOutput.length = 0;
      this.calculated = false;
    } 
    if (this.decimalPointInserted === false && this.numberInput[0] === 0) {
      this.numberInput.shift();
      this.calculatorOutput.shift();
    
    } 
    this.numberInput.push(num);
    this.calculatorOutput.push(num);
    this.operatorMethodUsed = false;
    this.plusMinusActive = true;
    this.variables();
  },

  add() {
    if (this.calculated === false) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate(this.operatorUsed);
    }
    this.operatorUsed = '+';
    this.operatorMethodUsed = true;
    this.variables();
  },

  multiply() {
    if (this.calculated === false) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate(this.operatorUsed);
    }
    this.operatorUsed = '*';
    this.operatorMethodUsed = true;
    this.variables();
  },

  subtract() {
    if (this.calculated === false) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate(this.operatorUsed);
    }
    this.operatorUsed = '-';
    this.operatorMethodUsed = true;
    this.variables();
  },

  divide() {
    if (this.calculated === false) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate(this.operatorUsed);
    }
    this.operatorUsed = '/';
    this.operatorMethodUsed = true;
    this.variables();
  },

  calculate(operator) {
    this.variables();
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
    if (this.operatorMethodUsed === false) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.calculate(this.operatorUsed);
      this.numberInput.length = 0;
      this.operatorMethodUsed = true;
      this.variables();
    }
  },

  decimalInput() {
    if (this.decimalPointInserted === false && this.calculated === false) {
      this.numberInput.push('.');
      this.calculatorOutput.push('.');
      this.decimalPointInserted = true;
      this.variables();
    }
  },

  clear() {
    this.numberInput = [0];
    this.numberArray = [null];
    this.calculatorOutput = [0];
    this.decimalPointInserted = false;
    this.calculated = false;
    this.operatorMethodUsed = false;
    this.operatorUsed = '+';
    this.variables();
  },

  plusMinus() {
    if (this.numberInput[0] !== '-' && this.calculated === false) {
      this.numberInput.unshift('-');
      this.calculatorOutput.unshift('-');
    } else if (this.numberInput[0] === '-' && this.calculated === false){
      this.numberInput.shift();
      this.calculatorOutput.shift();
    }
    if (this.numberArray[0] >= 0 && this.calculated === true) {
      this.numberArray[0] = this.numberArray[0] - this.numberArray[0] * 2;
      this.calculatorOutput.length = 0;
      this.calculatorOutput.push(this.numberArray[0]);
    } else if (this.numberArray[0] < 0 && this.calculated === true) {
      this.numberArray[0] = this.numberArray[0] - this.numberArray[0] * 2;
      this.calculatorOutput.length = 0;
      this.calculatorOutput.push(this.numberArray[0]);
    }
    this.variables();
  },

  //track all variables with print statements

  variables() {
    console.log(`user input: ${this.numberInput}`);
    console.log(`numbers array: ${this.numberArray}`);
    console.log(`output: ${this.calculatorOutput}`);
    console.log(`decimal inserted: ${this.decimalPointInserted}`);
    console.log(`calculated: ${this.calculated}`);
    console.log(`operator used: ${this.operatorUsed}`);
    console.log(`operator method used: ${this.operatorMethodUsed}`);
  },

};

/*
  Assign event listeners to all calculator elements inside an immediately called
function.
  Clicking a button displays content of the calculatorOutput array in addition
to calling one of the calculator object methods.
*/

(() => {

  function roundIfTooBig(number) {
    const numArray = number.split('');
    if (numArray.includes('e')) {
      number = Number(number);
      return number.toPrecision(2);
    } else if (numArray.length > 15) {
      number = Number(number);
      number = number.toPrecision(15);
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

  /* change the minus sign derection when displaying numbers on the
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

  /* Change text display direction temporarily when inserting the '.' bidi
  symbol to display it on the left side using 'direction' property. */

  const primaryDisplay = document.getElementById('displayPrimary');
  primaryDisplay.innerHTML = 0;
  let button = document.getElementById('numButtonPoint');
  button.addEventListener('click', () => {
    primaryDisplay.style.direction = 'ltr';
    calculator.decimalInput();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
  button = document.getElementById('addButton');
  button.addEventListener('click', () => {
    calculator.add();
    primaryDisplay.innerHTML = 
      changeMinusSignSide(roundIfTooBig(calculator.calculatorOutput.join('')));
  });
  button = document.getElementById('multiplyButton');
  button.addEventListener('click', () => {
    calculator.multiply();
    primaryDisplay.innerHTML = 
      changeMinusSignSide(roundIfTooBig(calculator.calculatorOutput.join('')));
  });
  button = document.getElementById('subtractButton');
  button.addEventListener('click', () => {
    calculator.subtract();
    primaryDisplay.innerHTML = 
      changeMinusSignSide(roundIfTooBig(calculator.calculatorOutput.join('')));
  });
  button = document.getElementById('divideButton');
  button.addEventListener('click', () => {
    calculator.divide();
    primaryDisplay.innerHTML = 
      changeMinusSignSide(roundIfTooBig(calculator.calculatorOutput.join('')));
  });
  button = document.getElementById('equalButton');
  button.addEventListener('click', () => {
    calculator.equal();
    primaryDisplay.innerHTML = 
      changeMinusSignSide(roundIfTooBig(calculator.calculatorOutput.join('')));
  });
  button = document.getElementById('clearButton');
  button.addEventListener('click', () => {
    calculator.clear();
    primaryDisplay.innerHTML = 0;
  });
  button = document.getElementById('plusMinusButton');
  button.addEventListener('click', () => {
    calculator.plusMinus();
    primaryDisplay.innerHTML = 
      changeMinusSignSide(roundIfTooBig(calculator.calculatorOutput.join('')));
    primaryDisplay.style.direction = 'rtl';
  });

  /* Use a for loop to repeatedly assign num pad event listeners by changing
  the last index of the num button id string. */
 
  let numButton = 'numButton0';
  button = document.getElementById(numButton);
  let buttonIdNumber = 0;
  for (let numButtonCount = 0; numButtonCount <= 9; ++numButtonCount) {
    button.addEventListener('click', () => {
      calculator.numInput(numButtonCount);
      primaryDisplay.innerHTML = 
        changeMinusSignSide(calculator.calculatorOutput.join(''));
      primaryDisplay.style.direction = 'rtl';
    });
    buttonIdNumber += 1;
    button = document.getElementById(numButton.slice(0, -1) + buttonIdNumber);
  }

})();


/*

SECOND DISPLAY 

DIFFERENT FONTS

BETTER BUTTON PRESS EFFECTS

DISPLAY PADDING LEFT SIDE

FIX BIDI SYMBOL DIRECTION WITHOIT USING JAVASCRIPT

ABILITY TO INSERT DECIMAL POINT AFTER OPERATIONS IF IT'S NOT 
PRESENT IN THE OUTPUT STRING

REFACTOR EVENT LISTENER ASSIGNING CODE

BACKSPACE BUTTON
*/