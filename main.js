import Calculator from "./calculator.js";

const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector("[data-current-operand]");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equal]");
const soundButton = document.querySelector("[data-sound]");

const calculator = new Calculator(previousOperand, currentOperand);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.addNumber(button.innerHTML);
    calculator.display();
  });
});

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.addOperator(button.innerHTML);
    calculator.display();
  });
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.display();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.display();
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.display();
});

soundButton.addEventListener("click", () => {
  calculator.switchSound();
});