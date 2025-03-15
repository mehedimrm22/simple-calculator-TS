const display = document.getElementById("display") as HTMLInputElement;
const buttons = document.querySelectorAll("button");

let currentInput: string = "";
let previousInput: string = "";
let operation: string | null = null;

function updateDisplay(): void {
  display.value = currentInput;
}

function inputNumber(num: string): void {
  currentInput += num;
  updateDisplay();
}

function inputOperator(op: string): void {
  if (currentInput === "") return;

  if (previousInput !== "") {
    calculateResult();
  }

  operation = op;
  previousInput = currentInput;
  currentInput = "";
}

function calculateResult(): void {
  if (previousInput === "" || currentInput === "" || operation === null) return;

  let result: number;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      if (curr === 0) {
        display.value = "Error";
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  previousInput = "";
  operation = null;
  updateDisplay();
}

function clearDisplay(): void {
  currentInput = "";
  previousInput = "";
  operation = null;
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.getAttribute("data-number");
    const operator = button.getAttribute("data-operator");
    const action = button.getAttribute("data-action");

    if (number) {
      inputNumber(number);
    } else if (operator) {
      inputOperator(operator);
    } else if (action === "clear") {
      clearDisplay();
    } else if (action === "calculate") {
      calculateResult();
    }
  });
});

updateDisplay();
