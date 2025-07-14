let display = document.getElementById('display'); //Get elements
let expression = ''; //initialize empty string
let memory = 0;

function append(value) {   //append a value
  expression += value;
  updateDisplay();
}

function clearDisplay() {   //clear entire display
  expression = '';
  updateDisplay('0');
}

function backspace() {  
  expression = expression.slice(0, -1);  //remove last character
  updateDisplay(expression || '0');  //update or show 0 if no expression left
}

function calculate(operator) {
  expression += operator;   //add operator
  updateDisplay();
}

function evaluateExpression() {
  try {
    const result = eval(expression);  //using eval() to calculate result of input expression
    updateDisplay(result);  //display result
    expression = result.toString();
  } catch {
    updateDisplay('Error');
    expression = '';
  }
}

function squareRoot() {
  try {
    const result = Math.sqrt(eval(expression));  //calculatesquare root of input
    updateDisplay(result);
    expression = result.toString();
  } catch {
    updateDisplay('Error');
    expression = '';
  }
}

function memoryAdd() {
  memory += parseFloat(display.textContent) || 0;  // Parse the current display text to a float and add to memory
}

function memorySubtract() {
  memory -= parseFloat(display.textContent) || 0;  // Parse the current display text to a float and subtract from memory
}

function memoryRecall() {
  expression += memory.toString(); //append memory value to expression
  updateDisplay();  //reset to 0
}

function memoryClear() {
  memory = 0;
}

function updateDisplay(value) {
  display.textContent = value ?? expression;
}

//Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    append(key);
  } else if (key === 'Enter') { 
    evaluateExpression();  //evaluate expression
  } else if (key === 'Backspace') {
    backspace();  //perform backspace
  } else if (key === 'Escape') {
    clearDisplay();  //clear dispaly 
  }
});
