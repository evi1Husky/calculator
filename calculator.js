// calculator object
// Get a number from user with numInput method and store it as an array in
// numberInput property, store results in numberArray starting with null value. 
// Use calculate, equal and operator methods to operate on 2 stored numbers. Use 
// calculatorOutput to display calculation results, the html page recieves
// data only from this array. Apply flags to block methods such as decimal 
// point to prevent user from inserting multiple symbols at the same time
// as well as empty the input and output arrays and allow for new number
// entries.

const calculator = {
  numberInput: [],
  numberArray: [null],
  calculatorOutput: [],
  decimalPointInserted: false,
  operated: false,
  operatorUsed: null,

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
      this.calculate('+');
    }
    this.variables();
  },

  calculate(operator) {
    let resultNumber = null;
    if (operator === '+') {
      resultNumber = this.numberArray[0] + this.numberArray[1];
      this.numberArray.length = 0;
      this.numberArray.push(resultNumber);
    }
    this.calculatorOutput.length = 0;
    this.calculatorOutput.push(resultNumber);
    this.operated = true;
    this.decimalPointInserted = false;
  },

  equal() {
    // let operator = '+';
    // if (operator === '+') {
    this.numberArray.push(Number(this.numberInput.join('')));
    this.calculate('+');
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
    alert('owo');
  },

  variables() {
    console.clear();
    console.log(`user input: ${this.numberInput.join('')}`);
    console.log(`numbers array: ${this.numberArray}`);
    console.log(`output: ${this.calculatorOutput.join('')}`);
    console.log(`decimal inserted: ${this.decimalPointInserted}`);
    console.log(`operated: ${this.operated}`); 
    console.log(`operator used: ${this.operatorUsed}`);
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
  let buttonIdNumber = 0;
  for (let numButtonCount = 0; numButtonCount <= 9; ++numButtonCount) {
    button.addEventListener('click', ()=>{
      calculator.numInput(numButtonCount);
      primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
      primaryDisplay.style.direction = 'rtl';
    });
    buttonIdNumber += 1;
    button = document.getElementById(numButton.slice(0, -1) + buttonIdNumber);
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
