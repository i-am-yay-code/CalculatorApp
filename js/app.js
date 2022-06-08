"use strict";
//-----Constants------------------------------------------------
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};
//--------------------------------------------------------------
//----------Functions-------------------------------------------

//Function that updates the display of calculator
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}


//Function for displaying the digits in input
const inputDigit = (digit) => {
    const displayValue = calculator.displayValue;

    //Check if we are waiting for the second operand
    if (calculator.waitingForSecondOperand === true) {
        //If true display new digits
        calculator.displayValue = digit;
        //We are not waiting for the second operand now
        calculator.waitingForSecondOperand = false;
    }
    else {
        //Otherwise we`re adding digits to the value on the board
        calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
    }
    console.log(calculator);
}



//function for adding the decimal
const inputDecimal = () => {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes('.')) {
        calculator.displayValue += '.';
    }
};

const clearAll = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;

    console.log(calculator);
}

const handleOperator = (nextOperator) => {

    //Deconstructing of the properties on the calculator obj
    const { firstOperand, displayValue, operator } = calculator;

    //Converting display value to float
    const inputValue = parseFloat(displayValue);

    //Verify that firstOperand is null and inputValue is not NaN
    if (firstOperand === null && !isNaN(inputValue)) {
        //Updating the firstOperand
        calculator.firstOperand = inputValue;
    }
    else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    //change the properties of calculator
    //Now a calculator must wait the second operand
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

//Function for calculating the expression after receiving another operator
const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
        case "+":
            {
                return firstOperand + secondOperand;
            }
        case "-":
            {
                return firstOperand - secondOperand;
            }
        case "*":
            {
                return firstOperand * secondOperand;
            }
        case "/":
            {
                return firstOperand / secondOperand;
            }
    }
    //If the operator is =, the second operand will be returned as it is
    return secondOperand;
}


//--------------------------------------------------------------

//Adding event "Click" to each button on the calculator
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            clearAll();
            break;
        default:
            // check if the key is an integer
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});

updateDisplay();
