export default class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.sound = new Audio("/assert/click.wav");
    this.soundOff = false;
    this.clear();
  }
  
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
  }
  
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if(this.currentOperand === "0")
      this.currentOperand = "";
  }
  
  addNumber(number) {
    const numberIsPoint = number === ".";
    const currentOperandHasPoint = this.currentOperand.includes(".");
    const currentOperandIsEmpty = this.currentOperand === "";
    
    if(number === "0" && currentOperandIsEmpty) return;
    if(numberIsPoint) 
      if(currentOperandIsEmpty)
        this.currentOperand += "0";
      else if(currentOperandHasPoint) return;
    
    this.currentOperand += number.toString();
  }
  
  addOperator(operator) {
    if(this.currentOperand === '') {
      this.operator = operator;
      return;
    }
    if(this.previousOperand !== '') this.compute();
    
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  
  calculate() {
    const a = parseFloat(this.previousOperand);
    const b = parseFloat(this.currentOperand);
    if(isNaN(a) || isNaN(b)) return "";
    
    switch(this.operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return (a / b).toFixed(10);
    }
  }
  
  compute() {
    const result = this.calculate();
    if(isNaN(result)) return;
    
    this.currentOperand = result.toString();
    this.previousOperand = "";
    this.operator = undefined;
    
  }
  
  switchSound() {
    this.soundOff = !this.soundOff;
  }
  
  formatNumber(number) {
    if(isNaN(+number)) return "";
    const numberParts = number.toString().split(".");
    const integerPart = parseFloat(numberParts[0]);
    const decimalPart = numberParts[1];
    let integerNumber;
    
    if(isNaN(integerPart)) 
      integerNumber = "";
    else integerNumber = integerPart.toLocaleString('en-us', {
      maximumFractionDigits: 0
    });
    
    if(decimalPart != null)
      return `${integerNumber}.${decimalPart}`;
    return integerNumber;
  }
  
  display() {
    if(this.currentOperand !== "")
      this.currentOperandElement.innerText = this.formatNumber(this.currentOperand);
    else this.currentOperandElement.innerText = 0;
    let previousOperand = this.formatNumber(this.previousOperand);
    
    if(this.operator) previousOperand += ` ${this.operator}`;
    
    this.previousOperandElement.innerText = previousOperand;
    
    if(this.soundOff) return;

    this.sound.load();
    this.sound.play();
  }
}