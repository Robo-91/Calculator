const container = document.getElementById('container1');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const equal = document.getElementById("equal");
let display = document.getElementById('display');
let content = document.getElementById('content');
let numOne = '';
let operateSign = [];
let numTwo = '';
let result;
let displayValue = [];

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

function operate(a = parseFloat(numOne),operator, b = parseFloat(numTwo)) {

	operator = operateSign;

	if(operator === `+`) {
		result = add(a,b);
	}

	if(operator === `-`) {
		result = subtract(a,b);
	}

	if(operator === `*`) {
		result = multiply(a,b);
	} 

	if(operator === `/`) {
		result = divide(a,b);
	}

	numOne = "";
	operateSign = "";
	numTwo = "";
	displayValue = [];
	result = +result.toFixed(10);
	return result;

}	

container.addEventListener("click",function(e) {

	if(e.target.textContent !== "C" && e.target.textContent !== "<" && e.target.textContent !== "="){
		displayValue.push(e.target.textContent);

		if(e.target.className === "number" && !numTwo.length && !operateSign.length){
			if (numOne.length >= 11) {
				alert('Cannot add anymore characters!');
				return null;
			}
			numOne = displayValue.slice(0).join('');
			content.textContent = displayValue.slice(0).join('');
		}
		
		if(e.target.className === "operator" && numOne.length && numTwo === ''){
			if (operateSign.length >= 1) {
				alert('Cannot add anymore operators!')
				displayValue.pop();
			}
			operateSign = e.target.textContent;
			content.textContent = displayValue.slice(displayValue.indexOf(operateSign));
		}

		if(numOne.length && operateSign.length && e.target.className === 'number'){
			numTwo = displayValue.slice(displayValue.indexOf(operateSign) + 1);
			numTwo = numTwo.join('');
			content.textContent = numTwo;
			if (numTwo.length >= 11) {
				alert('Cannot add anymore characters!');
				return null;
			}
		}
	}

	if(numOne.length && operateSign.length && numTwo.length && e.target.className === 'operator'){
		operate();
		numOne = result.toString();
		operateSign = e.target.textContent;
		content.textContent = result + e.target.textContent;
		displayValue.push(result.toString(),operateSign);
		numTwo = displayValue.slice(displayValue.indexOf(operateSign) + 1);
		numTwo = numTwo.join('');
	}

	if(e.target.id === "container1"){
		displayValue.pop(e.target.textContent);
		content.textContent = displayValue.join('');
	}
});

clear.addEventListener("click", function(){
	displayValue = [];
	content.textContent = "";
	numOne = "";
	operateSign = "";
	numTwo = "";
	result = 0;
});

backspace.addEventListener("click", function(){
	displayValue.pop();
	// content.textContent = displayValue.join('');
	if (numOne.length && !operateSign.length && !numTwo.length) {
		numOne = numOne.slice(0, -1);
		content.textContent = numOne;
	}
	if (operateSign.length && !numTwo.length) {
		operateSign = '';
		content.textContent = numOne;
	}
	if (numOne.length && operateSign.length && numTwo.length) {
		numTwo = numTwo.slice(0, -1);
		content.textContent = numTwo;
	}
	if (!numTwo.length && operateSign.length && numOne.length) {
		content.textContent = operateSign;
	}
});

equal.addEventListener("click", function(){
	operate();

	content.textContent = result;

	if(operateSign === "/" && numTwo === '0'){
		content.textContent = "Invalid operation!";
	}

	if(result === NaN){
		content.textContent = "Invalid operation!";
	}
});

