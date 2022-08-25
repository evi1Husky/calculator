const calculator = {
  calculatorOutput: [],
  float: false,
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
    console.log(this.numberInput);
    console.log(this.numberArray);
  },

  add() {
    if (this.operated === false) {
      this.numberArray.push(Number(this.numberInput.join('')));
      this.numberInput.length = 0;
      this.calculate('+');
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
    console.log(this.numberInput);
    console.log(this.numberArray);
  },

  equal() {
    // let operator = '+';
    // if (operator === '+') {
    this.numberArray.push(Number(this.numberInput.join('')));
    this.calculate('+');
    this.numberInput.length = 0;
  }
};



// floatInput() {
//   if (calculator.float == false) {
//     this.calculatorOutput.push('.');
//   }
//   calculator.float = true;
// },

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
    calculator.floatInput();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
  button = document.getElementById('addButton');
  button.addEventListener('click', ()=>{
    primaryDisplay.style.direction = 'ltr';
    calculator.add();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
  button = document.getElementById('equalButton');
  button.addEventListener('click', ()=>{
    primaryDisplay.style.direction = 'ltr';
    calculator.equal();
    primaryDisplay.innerHTML = calculator.calculatorOutput.join('');
  });
})();
