// Buttons lebel
const buttons = [
    [7, 8, 9, "←", "C"],
    [4, 5, 6, "÷", "×"],
    [1, 2, 3, "-", "+"],
    [".", 0, "π", "Ans", "="],
];
// Operators object
const operators = {
    "+":"+",
    "-":"-",
    "÷":"/",
    "×":"*",
};

const get = el => document.querySelector(el);
const createElement = (element, className, text) => {
    element = document.createElement(element);

    if(className) element.classList.add(className);
    if(text || text === 0) element.appendChild(document.createTextNode(text));

    return element;
};

let btnCont, question, answer;
let ques = [];
let experassion = [];
let result = 0;

onload = () => {
    btnCont = get("#btnCont");
    question = get(".question");
    answer = get(".answer");
    
    buttons.forEach(btnRow => {
    const row = createElement("tr");

    btnRow.forEach(btn => {
        const cell = createElement("td");
        const button = createElement("button", "btn", btn);

        if(btn === "←") button.style.backgroundColor = "orangered";
        if(btn === "C") button.style.backgroundColor = "red";
        if(btn in operators) button.style.backgroundColor = "blueviolet";
        if(btn === "Ans") button.style.backgroundColor = "#918300";
        if(btn === "=") button.style.backgroundColor = "green";

        button.addEventListener("click", handleClick);
        cell.appendChild(button);
        row.appendChild(cell);
    });
    btnCont.appendChild(row);
});
}

function handleClick(e) {
    // Get the inner text of the button
    const txt = e.target.innerHTML;

    // Initialize value variable base on button's  text
    let value = (txt in operators)? operators[txt]: 
        (txt === "Ans")? result: 
        (txt === "π")? 
        (ques[experassion.length-1] in operators || !ques[experassion.length-1])? 
        Math.PI:"*"+Math.PI: txt;

    // Clear function
    function clear() {
        experassion = [];
        ques = [];
        answer.innerHTML = 0;
    }

    // Handle button base on it text
    switch(txt) {
        case "=": // Handle equal button
            try {
                const cal = eval(experassion.join("")); 
                result = cal? cal:"Syntax Error";
            } catch {
                result = "Math Error";
            }

            clear();
            answer.innerHTML = result;
        break;
        default: // Handle other buttons
            if(txt === "C") clear(); // Clear button
            else if(txt === "←") { // Backspace button
                experassion.pop();
                ques.pop();
            } else if(ques.length >= 10) return;
            else { // Other buttons
                experassion.push(value);
                ques.push(txt);
            }

            // Display calculator input
            question.innerHTML = ques.join("") || "0";
    }
}
