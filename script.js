
const add = (a,b) => { return a+b }
const subtract = (a,b) => { return a-b }
const multiply = (a,b) => { return a*b }
const divide = (a,b) => { return a/b }

let actual = '';
let previous = '';

const operate = (operator, num1, num2) => {
    switch(operator){
        case '+':
            return add(num1,num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

const keys = document.querySelectorAll('.key');

function pressNumber(evt){
    let pressedText = evt.target.textContent;
    let displayActual = document.querySelector('.actual');

    displayActual.textContent += pressedText;

    actual = displayActual.textContent;
}

function clearDisplay(){
    let displayActual = document.querySelector('.actual');
    let displayPrevious = document.querySelector('.previous');

    displayActual.textContent = '';
    displayPrevious.textContent = '';

    actual = '';
    previous = '';
}

function pressOperator(evt){
    let operatorText = evt.target.textContent;

    if (document.querySelector('.previous').textContent == ''){
        previous = actual+operatorText;
        actual = '';

        document.querySelector('.actual').textContent = actual;
        document.querySelector('.previous').textContent = previous;
    }else{
        let prevOperatorText = previous.slice(-1);
        let prevOperatorNum = Number.parseFloat(previous.slice(0, -1));
        let actualNum = Number.parseFloat(actual);

        let result = operate(prevOperatorText, prevOperatorNum, actualNum);

        actual = result.toString();

        previous = actual+operatorText;
        actual = '';

        document.querySelector('.actual').textContent = actual;
        document.querySelector('.previous').textContent = previous;
    }

}

function equals(){
    let prevOperatorText = previous.slice(-1);
    let prevOperatorNum = Number.parseFloat(previous.slice(0, -1));
    let actualNum = Number.parseFloat(actual);

    let result = operate(prevOperatorText, prevOperatorNum, actualNum);

    actual = result.toString();
    previous = '';

    document.querySelector('.actual').textContent = actual;
    document.querySelector('.previous').textContent = previous;
}

keys.forEach((k) =>{
    if ('0123456789'.includes(k.textContent)){
        k.addEventListener('click', pressNumber);
    }
    if ('CLR' == k.textContent){
        k.addEventListener('click', clearDisplay);
    }
    if ('+*-/'.includes(k.textContent)){
        k.addEventListener('click', pressOperator);
    }
    if('=' == k.textContent){
        k.addEventListener('click', equals);
    }
});