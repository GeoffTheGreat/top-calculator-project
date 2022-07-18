let displayOperand = "";
let firstOperand = "";
let secondOperand = "";
let operator = "";
let calculated = 0;
const calScreen = document.getElementById("screen");
calScreen.textContent = "0";
calScreen.style.justifyContent = "flex-end";
const buttons = Array.from(document.querySelectorAll("button"));

window.addEventListener("keydown", keyPress);

buttons.forEach((button) => {
  button.addEventListener("click", identify);
});
function operLogic() {
  if (firstOperand === "") {
    firstOperand = displayOperand;
  } else {
    secondOperand = displayOperand;
  }
  displayOperand = "";
  document.getElementById("period").removeAttribute("disabled");
}
function hasOperator(receivedOperator) {
  if (operator === "") {
    operator = receivedOperator;
  } else {
    if (firstOperand === "" || secondOperand === "") {
      operator = receivedOperator;
    } else {
      doCalculation();
      operator = receivedOperator;
    }
  }
}

function doCalculation() {
  if (firstOperand !== "" && secondOperand !== "" && operator !== "") {
    switch (operator) {
      case "divide":
        calculated =
          Math.round(
            (parseFloat(firstOperand) / parseFloat(secondOperand)) * 100
          ) / 100;
        break;
      case "multiply":
        calculated =
          Math.round(
            parseFloat(firstOperand) * parseFloat(secondOperand) * 100
          ) / 100;
        break;
      case "plus":
        calculated =
          Math.round(
            (parseFloat(firstOperand) + parseFloat(secondOperand)) * 100
          ) / 100;
        break;
      case "minus":
        calculated =
          Math.round(
            parseFloat(firstOperand) * parseFloat(secondOperand) * 100
          ) / 100;
        break;
    }
    calScreen.textContent = calculated.toString();
    displayOperand = "";
    firstOperand = calculated.toString();
    secondOperand = "";
    document.getElementById("period").removeAttribute("disabled");
  }
}
function plusMin() {
  displayOperand = Math.round(parseFloat(displayOperand) * -100) / 100;
  calScreen.textContent = displayOperand.toString();
}
function toPercent() {
  displayOperand = Math.round(parseFloat(displayOperand) * 100) / 10000;
  calScreen.textContent = displayOperand.toString();
}
function keyPress(e) {
  let key = document.querySelector(`button[data-key="${e.keyCode}"]`);
  if (key != null) {
    let btnId = key.getAttribute("id");
    let myObj = { target: { id: btnId } };
    identify(myObj);
  }
}

function identify(e) {
  let btnId = e.target.id;

  switch (btnId) {
    case "nr0":
    case "nr1":
    case "nr2":
    case "nr3":
    case "nr4":
    case "nr5":
    case "nr6":
    case "nr7":
    case "nr8":
    case "nr9":
      displayOperand += btnId[2];
      calScreen.textContent = displayOperand;
      break;
    case "period":
      displayOperand = calScreen.textContent;
      if (displayOperand.indexOf(".") < 0) {
        displayOperand += ".";
        e.target.disabled = true;
      }
      break;
    case "divide":
      operLogic();
      hasOperator("divide");
      break;
    case "multiply":
      operLogic();
      hasOperator("multiply");
      break;
    case "minus":
      operLogic();
      hasOperator("minus");
      break;
    case "plus":
      operLogic();
      hasOperator("plus");
      break;
    case "equals":
      secondOperand = displayOperand;
      doCalculation();
      break;
    case "clear":
      firstOperand = "";
      secondOperand = "";
      displayOperand = "";
      operator = "";
      calculated = 0;
      calScreen.textContent = "0";
      break;
    case "plus-minus":
      plusMin();
      break;
    case "percent":
      toPercent();
      break;
  }
}
