var screen = document.getElementById("screen");  
screen.textContent = '0';  
var text = screen.textContent;
var prev_button_content = '';
var current_button_content = '';
var screen_content = '0';
var prev_number = 0;
var current_number = 0;
var operators = ['+', '-', '/', '%', '*', '+-', '='];
var operator = '';
var result = 0;

$("button").click(function() {
    current_button_content = this.value;
    console.log(current_button_content);
    
    if (current_button_content === 'C') {
        prev_button_content = '';
        current_button_content = '';
        screen_content = '0';
        prev_number = 0;
        current_number = 0;
        operator = '';
        result = 0;
    } else {
        if (prev_button_content === '' && current_button_content === '0') {
            screen_content = current_button_content;    
        } else if (prev_button_content === '0' && current_button_content === '0') {
            console.log('OLLALAH')
            screen_content = current_button_content;
            prev_button_content = '';
            current_button_content = '';
        } else if (prev_button_content === '0' && '123456789'.includes(current_button_content)) {
            console.log('OBLADI')
            screen_content = current_button_content;
            prev_button_content = '';
        } else if (current_button_content === '.' && prev_button_content.includes('.')) {
            current_button_content = '';
        } else {
            if (operators.includes(current_button_content)) {
                if (prev_number === 0) {
                    operator = current_button_content;
                    prev_number = prev_button_content;
                    if (prev_number[0] === '.') {
                        prev_number = '0' + prev_number;
                    }
                    console.log('Prev number: '+ prev_number);
                    screen_content = prev_button_content;
                } else {
                    current_number = prev_button_content;
                    if (current_number[0] === '.') {
                        current_number = '0' + current_number;
                    }
                    if (current_button_content === '=') {
                        result = eval(prev_number + operator + current_number);
                        console.log('EQUAL: ' + prev_number + operator + current_number);
                        operator = '';
                    } else {
                        result = eval(prev_number + operator + current_number);
                        operator = current_button_content;
                    }
                    
                    console.log('Operator: ' + operator);
                    console.log('Prev: ' + prev_number);
                    console.log('Current: ' + current_number);
                    console.log('Result: ' + result);
                    screen_content = result;
                    prev_number = result;
                }
                
                
            prev_button_content = '';
            current_button_content = '';    
            } else {
                screen_content = prev_button_content + current_button_content;
            }
            
        }
        console.log('prev_button_content before: ' + prev_button_content);
        prev_button_content = prev_button_content + current_button_content;
        console.log('prev_button_content after: ' + prev_button_content);
    }


    

    // send screen content to HTML file:
    console.log(screen_content);
    screen = document.getElementById("screen");  
    if (screen.textContent) {
        screen.textContent = screen_content;
        text = screen.textContent;
    } else if (screen.innerText) {
        screen.innerText = screen_content;
        text = screen.innerText;
    }
});
