let currentInput = '';
let previousInput = '';
let operation = '';

function pressButton(value) {
    const display = document.getElementById("display");

  
    if (value === 'C') {
        clearDisplay();
        changeMaskot('normal');
    } else if (value === '=') {
      
        calculate();
        changeMaskot('thinking');
    } else {
        
        appendToDisplay(value);
        changeMaskot('happy');
    }
}


function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
   
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '^':
            result = Math.pow(prev, current);
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

 
    currentInput = result.toString();
    operation = '';
    previousInput = '';
    updateDisplay();
}


function appendToDisplay(value) {
    
    if (['+', '-', '*', '/', '^', '%'].includes(value)) {
        if (currentInput === '') return; 
        previousInput = currentInput; 
        operation = value; 
        currentInput = ''; 
    } else {
        
        currentInput += value;
    }
    updateDisplay();
}


function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = '';
    updateDisplay();
}


function updateDisplay() {
    document.getElementById('display').value = currentInput || '0'; 
}


function changeMaskot(state) {
    const maskotImg = document.getElementById("maskot-img");

    switch (state) {
        case 'happy':
            maskotImg.src = "images/maskot2.png"; 
            break;
        case 'thinking':
            maskotImg.src = "images/maskot3.png"; 
            break;
        case 'normal':
        default:
            maskotImg.src = "images/maskot2.png"; 
            break;
    }
}
