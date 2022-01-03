function add(a, b) {
    displayResult(a + b);
}

function substract(a, b) {
    displayResult(a - b);
}

function multiply(a,b) {
    displayResult(a * b);
}

function divide(a, b) {
    if (b === 0) displayLine("Cannot divide by 0")
    else displayResult (a / b);
}

function operate(a, operator, b) {
    if (operator === '+') add(a, b);
    else if (operator === '-') substract(a, b);
    else if (operator === '×') multiply(a, b);
    else if (operator === '÷') divide(a, b);
}

function input() {
    const buttons = document.querySelectorAll('.buttons');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            handle(button.textContent);
        });
    });
}

function handle(button) {
    if (!isNaN(button)) {
        display(button)
    } else if (button === "C") {
        resetDisplay()
    } else if (button === "%" || button === "÷" || button === "×" ||button === "-" || button === "+") {
        if (valueA === undefined) {
        valueA = valueDisplay;
        operator = button;
        arrayValue.splice(0, arrayValue.length);
        displayLine(valueA, operator);
        } else if (arrayValue.length < 1) {
            operator = button;
            displayLine(valueA, operator);
        } else {
            valueB = valueDisplay;
            operate(valueA, operator, valueB)
            arrayValue.splice(0, arrayValue.length);
            operator = button;
            displayLine(valueA, operator);
            }
    } else if (button === "=" && valueA !== undefined) {
        valueB = valueDisplay;
        displayLine(valueA, operator, valueB, "=");
        arrayValue.splice(0, arrayValue.length);
        operate(valueA, operator, valueB)
    }
}

function display(number) {
    arrayValue.push(parseInt(number));
    valueDisplay = parseInt(arrayValue.join(""));
    const onscreen = document.querySelector('#on_screen');
    onscreen.textContent = valueDisplay;
}

function resetDisplay() {
    arrayValue.splice(0, arrayValue.length);
    valueDisplay = 0;
    const onscreen = document.querySelector('#on_screen');
    onscreen.textContent = valueDisplay;
    const line = document.querySelector('#calculations');
    line.textContent = '0';
    valueA = undefined;
    valueB = undefined;
    operator = undefined;
}

function displayLine(a, operator = "", b = "", equal = "") {
    const line = document.querySelector('#calculations');
    line.textContent = a + ' ' + operator + ' ' + b + ' ' + equal;
}

function displayResult(result) {
    const onscreen = document.querySelector('#on_screen');
    onscreen.textContent = result;
    valueA = result;
    valueB = undefined;
}

input();
let arrayValue =[];
let valueDisplay;
let operator;
let valueA;
let valueB;