//------ GLOBAL VARIABLES ------//
//DOM elements
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-button');

//Calculator logic
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

//Calculate first and second value
const calculate = {
    '+': (firstValue, currentValue) => firstValue + currentValue,
    '-': (firstValue, currentValue) => firstValue - currentValue,
    '*': (firstValue, currentValue) => firstValue * currentValue,
    '/': (firstValue, currentValue) => firstValue / currentValue,
}

//------ FUNCTIONALITY ------//
//Display numbers
function sendNumberValue(number) {
    if(awaitingNextValue) {
      calculatorDisplay.textContent = number;
      awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    } 
}

//Handle decimal
function addDecimal() {
    //  if operator pressed dont add decimal
    if(awaitingNextValue) return;
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//Handle operator use
function useOperator(operator) {
    // prevent entering multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    const currentValue = Number(calculatorDisplay.textContent);
    if(!firstValue) { 
        firstValue = currentValue;
    } else { // if we already have a first value  
        const calculatedValue = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculatedValue;
        firstValue = calculatedValue;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

//Clear display
function resetAll() {
    calculatorDisplay.textContent = '0';
     firstValue = 0;
     operatorValue = '';
     awaitingNextValue = false;
}

//------EVENT LISTENERS------//
//Apply event listeners to buttons
inputBtns.forEach((inputBtn) => {
    //get buttons without classList (numbers 1-9)
    if(inputBtn.classList.length ===  0) { 
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    //operators
    } else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    //number 0
    } else if(inputBtn.classList.contains('zero')){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    //decimal    
    } else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () =>  addDecimal());
    } 
});

//reset  
clearBtn.addEventListener('click', resetAll);
