var screen = document.getElementById("screen");  
screen.textContent = '0';
var text = screen.textContent;

var pressed_button = '';
var previous_number = '';
var current_number = '';
var operator = '';
var result = '';
var on_the_screen = '0';
var we_have_error = false;
var after_equal = false;

$("button").click(function() {
    pressed_button = this.value;
    if (pressed_button === 'C') {
        pressed_button = '';
        previous_number = '';
        current_number = '';
        operator = '';
        result = '';
        on_the_screen = '0';
        we_have_error = false;
        after_equal = false;
    } else {

        if (we_have_error === false) {
            if ('0123456789'.includes(pressed_button)) {
                if (after_equal) {
                    previous_number = '';
                    current_number = pressed_button;
                    operator = '';
                    on_the_screen = current_number;
                    after_equal = false;
                } else {
                    if (current_number !== '0') {
                    current_number = current_number + pressed_button;
                    on_the_screen = current_number;
                    }
                }
                
            } else if (pressed_button === '.') {
                if (after_equal) {
                    previous_number = '';
                    current_number = '0.';
                    operator = '';
                    on_the_screen = current_number;
                    after_equal = false;
                }
                if (current_number.includes('.') === false) {
                    if (current_number === '') {
                        current_number = '0';
                    }
                    current_number = current_number + pressed_button;
                    on_the_screen = current_number;
                }
                
            } else if (pressed_button === '+-') {
                if (after_equal) {
                    current_number = previous_number;
                    previous_number = '';
                    operator = '';
                    on_the_screen = current_number;
                    after_equal = false;
                }
                if (current_number !== '' && current_number !== '0') {
                    current_number = (Number(current_number) * -1).toString();
                    on_the_screen = current_number;
                }
                
            } else if ('-*/+'.includes(pressed_button)) {
                if (after_equal) {
                    current_number = '';
                    after_equal = false;
                }
                if ((previous_number === '') && (operator === '') && (current_number !== '')) {
                    previous_number = current_number;
                    current_number = '';
                    operator = pressed_button;
                } else if ((previous_number !== '') && (operator !== '') && (current_number === '')) {
                    operator = pressed_button;
                } else if ((previous_number !== '') && (current_number !== '')) {
                    try {
                        result = eval(previous_number + operator + current_number);
                        if (result === Infinity) {
                            throw new Error('division by Zero');
                        }
                        previous_number = result.toString();
                        current_number = '';
                        operator = pressed_button;
                        on_the_screen = result.toString();
                    } catch (error) {
                        on_the_screen = error;
                        we_have_error = true;
                    }
                }

            } else if (pressed_button === '%') {
                try {
                    if ((previous_number !== '') && ('-*/+'.includes(operator)) && (current_number !== '')) {
                        result = eval(previous_number + operator + '(' + previous_number + '*' + (Number(current_number)*0.01).toString() + ')');
                        if (result === Infinity) {
                            throw new Error('division by Zero');
                        }
                        previous_number = result.toString();
                        current_number = '';
                        operator = '';
                        on_the_screen = result.toString();
                    } else {
                        throw new Error('bad usage of percentage');
                    }
                } catch (error) {
                    we_have_error = true;
                    on_the_screen = error;
                }

            } else if (pressed_button === '=') {
                if ((previous_number !== '') && (operator !== '') && (current_number !== '')) {
                    try {
                        result = eval(previous_number + operator + current_number);
                        if (result === Infinity) {
                            throw new Error('division by Zero');
                        }
                        after_equal = true;
                        previous_number = result.toString();
                        on_the_screen = result.toString();
                    } catch (error) {
                        we_have_error = true;
                        on_the_screen = error;
                    }
                }
            }
        }
    }      
        
    // send screen content to HTML file:
    console.log('To the screen: ' + on_the_screen);
    screen = document.getElementById("screen");  
    if (screen.textContent) {
        screen.textContent = on_the_screen;
        text = screen.textContent;
    } else if (screen.innerText) {
        screen.innerText = on_the_screen;
        text = screen.innerText;
    }
});