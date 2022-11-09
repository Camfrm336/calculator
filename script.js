let operator = "";
let previousValue = "";
let currentValue = "0";
document.addEventListener("DOMContentLoaded", function() {
    let clear = document.querySelector("#clear-btn");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");
    currentScreen.textContent = 0;

    numbers.forEach((number) => number.addEventListener("click", function(e) {
        handleNumber(e.target.textContent);
        currentScreen.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e) {
        handleOperator(e.target.textContent);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }))
    clear.addEventListener("click",function() {
        operator = "";
        previousValue = "";
        currentValue = "";
        previousScreen.textContent = previousValue;
        currentScreen.textContent = 0;
    }) 
    equal.addEventListener("click", function(){
        if(currentValue != "" && previousValue != "") {
            calculate();
            operator = "";
            previousScreen.textContent = "";
            if (previousValue.length <= 5) {
                currentScreen.textContent = previousValue;
            }
            else {
                currentScreen.textContent = previousValue.slice(0,5) + "...";
            }
        }
        
    })
    decimal.addEventListener("click", function() {
        addDecimal();
    })
        
    
})

function handleNumber(num) {
    if (currentValue.length <= 5) {
    currentValue += num;
    }
}
function handleOperator(op) {
    if (currentValue != "" && previousValue != "" && operator != "") {
        calculate();
    }
    operator = op;
    previousValue = currentValue;
    currentValue = "";
    
}
function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    if (operator === "+") {
        previousValue += currentValue;
    } 
    else if (operator === "-") {
        previousValue -= currentValue;
    }
    else if (operator === "x") {
        previousValue *= currentValue;
    }
    else { 
        (operator === "/");
        previousValue /= currentValue;
        if (currentValue === 0) {
            operator = "";
            previousValue = "";
            currentValue = "0";
            alert("You can't divide by zero, heres a fresh start");
        }
    }
    previousValue = roundNumber(previousValue)
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
    
}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}
function addDecimal() {
    if (!currentValue.includes(".")) {
        currentValue += ".";
    }
}
