var screen = document.getElementById("screen");  
screen.textContent = '0';
var text = screen.textContent;

var pressedButton = '';
var previousNumber = '';
var currentNumber = '';
var operator = '';
var result = '';
var onTheScreen = '0';
var weHaveError = false;
var afterEqual = false;

$("button").click(function() {
    pressedButton = this.value;
    if (pressedButton === 'C') {
        pressedButton = '';
        previousNumber = '';
        currentNumber = '';
        operator = '';
        result = '';
        onTheScreen = '0';
        weHaveError = false;
        afterEqual = false;
    } else {

        if (weHaveError === false) {
            if ('0123456789'.includes(pressedButton)) {
                if (afterEqual) {
                    previousNumber = '';
                    currentNumber = pressedButton;
                    operator = '';
                    onTheScreen = currentNumber;
                    afterEqual = false;
                } else {
                    if (currentNumber !== '0') {
                        currentNumber = currentNumber + pressedButton;
                        onTheScreen = currentNumber;
                    } else if (currentNumber === '0') {
                        currentNumber = pressedButton;
                        onTheScreen = currentNumber;
                    }
                }
                
            } else if (pressedButton === '.') {
                if (afterEqual) {
                    previousNumber = '';
                    currentNumber = '0.';
                    operator = '';
                    onTheScreen = currentNumber;
                    afterEqual = false;
                }
                if (currentNumber.includes('.') === false) {
                    if (currentNumber === '') {
                        currentNumber = '0';
                    }
                    currentNumber = currentNumber + pressedButton;
                    onTheScreen = currentNumber;
                }
                
            } else if (pressedButton === '+-') {
                if (afterEqual) {
                    currentNumber = previousNumber;
                    previousNumber = '';
                    operator = '';
                    onTheScreen = currentNumber;
                    afterEqual = false;
                }
                if (currentNumber !== '' && currentNumber !== '0') {
                    currentNumber = (Number(currentNumber) * -1).toString();
                    onTheScreen = currentNumber;
                }
                
            } else if ('-*/+'.includes(pressedButton)) {
                if (afterEqual) {
                    currentNumber = '';
                    afterEqual = false;
                }
                if ((previousNumber === '') && (operator === '') && (currentNumber !== '')) {
                    previousNumber = currentNumber;
                    currentNumber = '';
                    operator = pressedButton;
                } else if ((previousNumber !== '') && (operator !== '') && (currentNumber === '')) {
                    operator = pressedButton;
                } else if ((previousNumber !== '') && (currentNumber !== '')) {
                    try {
                        // avoid invalid left-hand side expression in prefix operation:
                        if (currentNumber[0] === '-') {
                            currentNumber = '(' + currentNumber + ')';
                        }
                        result = eval(previousNumber + operator + currentNumber);
                        // correct the convertion from binary to decimal:
                        result = Math.round(result*10000000000)/10000000000;
                        if (result === Infinity) {
                            throw new Error('div by Zero');
                        }
                        previousNumber = result.toString();
                        currentNumber = '';
                        operator = pressedButton;
                        onTheScreen = result.toString();
                    } catch (error) {
                        onTheScreen = error;
                        weHaveError = true;
                    }
                }

            } else if (pressedButton === '%') {
                try {
                    if ((previousNumber !== '') && ('-*/+'.includes(operator)) && (currentNumber !== '')) {
                        // avoid invalid left-hand side expression in prefix operation:
                        if (currentNumber[0] === '-') {
                            currentNumber = '(' + currentNumber + ')';
                        }
                        result = eval(previousNumber + operator + '(' + previousNumber + '*' + (Number(currentNumber)*0.01).toString() + ')');
                        if (result === Infinity) {
                            throw new Error('div by Zero');
                        }
                        // correct the convertion from binary to decimal
                        result = Math.round(result*10000000000)/10000000000;
                        previousNumber = result.toString();
                        afterEqual = true;
                        onTheScreen = result.toString();
                    } else {
                        throw new Error('bad use %');
                    }
                } catch (error) {
                    weHaveError = true;
                    onTheScreen = error;
                }

            } else if (pressedButton === '=') {
                if ((previousNumber !== '') && (operator !== '') && (currentNumber !== '')) {
                    try {
                        // avoid invalid left-hand side expression in prefix operation:
                        if (currentNumber[0] === '-') {
                            currentNumber = '(' + currentNumber + ')';
                        }
                        result = eval(previousNumber + operator + currentNumber);
                        // correct the convertion from binary to decimal
                        result = Math.round(result*10000000000)/10000000000;
                        if (result === Infinity) {
                            throw new Error('div by Zero');
                        }
                        afterEqual = true;
                        previousNumber = result.toString();
                        onTheScreen = result.toString();
                    } catch (error) {
                        weHaveError = true;
                        onTheScreen = error;
                    }
                }
            }
        }
    }      
        
    // send screen content to HTML file:
    screen = document.getElementById("screen");  
    if (screen.textContent) {
        screen.textContent = onTheScreen;
        text = screen.textContent;
    } else if (screen.innerText) {
        screen.innerText = onTheScreen;
        text = screen.innerText;
    }
});