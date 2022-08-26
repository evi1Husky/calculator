// calculator object
// Get a number from user with numInput method and store it as an array in
// numberInput property, store results in numberArray starting with 0. Use 
// calculate, equal and operator methods to operate on 2 stored numbers. Use 
// calculatorOutput to display calculation results, the html page only gets
// data from this array. Apply flags to block methods such as decimal point
// to prevent the user from inserting multiple at the same time as well as
// to empty input and output arrays and allow for new number entries.

const calculator = {
  calculatorOutput: [],
  decimalPoint: false,
  operated: false,
  operatorUsed: null,
  numberInput: [],
  numberArray: [0],

  numInput(num) {
    if (this.operated === true) {
      this.calculatorOutput.length = 0;
      this.operated = false;
    }
    this.numberInput.push(num);
    this.calculatorOutput.push(num);
    console.log(`number input: ${this.numberInput.join('')}`);
    console.log(`number array: ${this.numberArray.join('')}`);
  },

  add() {
    if (this.operated === false) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate('+');
      console.log(`number input: ${this.numberInput.join('')}`);
      console.log(`number array: ${this.numberArray.join('')}`);
    }
  },

  calculate(operator) {
    if (operator === '+') {
      let num = this.numberArray[0] + this.numberArray[1];
      this.numberArray.length = 0;
      this.numberArray.push(num);
    }
    this.calculatorOutput.length = 0;
    this.calculatorOutput.push(this.numberArray[0]);
    this.operated = true;
    this.decimalPoint = false;
  },

  equal() {
    // let operator = '+';
    // if (operator === '+') {
    this.numberArray.push(Number(this.numberInput.join('')));
    this.calculate('+');
    this.numberInput.length = 0;
    console.log(`number input: ${this.numberInput.join('')}`);
    console.log(`number array: ${this.numberArray.join('')}`);
  },

  decimalInput() {
    if (this.decimalPoint == false) {
      this.numberInput.push('.');
      this.calculatorOutput.push('.');
    }
    this.decimalPoint = true;
    console.log(`number input: ${this.numberInput.join('')}`);
    console.log(`number array: ${this.numberArray.join('')}`);
  },

  clear() {
    alert('owo');
  }

};

// Assign event listeners to all calculator object elements within 
// a sepparate function. Change text display direction temporarily
// when inserting the decimal point symbol to display it on the right
// side. Use a for loop to automatically assign num pad event listeners
// by changing the last index of the num button id string. Clicking a
// button displays the content of the calculatorOutput array in 
// addition to calling one of the calculator object methods.

(() => {
  const primaryDisplay = document.getElementById('displayPrimary');
  let numButton = 'numButton0';
  let button = document.getElementById(numButton);
  let num = 0;
  for (let i = 0; i <= 9; ++i) {
    button.addEventListener('click', ()=>{
      calculator.numInput(i);
      primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
      primaryDisplay.style.direction = 'rtl';
    });
    num += 1;
    button = document.getElementById(numButton.slice(0, -1) + num);
  }
  button = document.getElementById('numButtonPoint');
  button.addEventListener('click', ()=>{
    primaryDisplay.style.direction = 'ltr';
    calculator.decimalInput();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
  button = document.getElementById('addButton');
  button.addEventListener('click', ()=>{
    calculator.add();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
  button = document.getElementById('equalButton');
  button.addEventListener('click', ()=>{
    calculator.equal();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
})();
