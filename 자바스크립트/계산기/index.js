/** @format */

const numberInput = document.querySelector("#input");
const clearButton = document.querySelector("#clear");
const plusButton = document.querySelector("#plus");
const minusButton = document.querySelector("#minus");
const divideButton = document.querySelector("#divide");
const multiplyButton = document.querySelector("#multiply");
const calculateButton = document.querySelector("#calculate");
const resultInput = document.querySelector("#result");

let temp; //저장된 값
let operator; //연산자

plusButton.addEventListener("click", () => {
  if (temp) {
    operator = "+";
    numberInput.value = null;
  } else { //temp가 없으면
    if (numberInput.value) {
      temp = Number(numberInput.value); //문자열을 숫자로
      operator = "+";
      numberInput.value = null;
      resultInput.value = null;
    }
  }
});

minusButton.addEventListener("click", () => {
  if (temp) {
    operator = "-";
    numberInput.value = null;
  } else {
    if (numberInput.value) {
      temp = Number(numberInput.value); //문자열을 숫자로
      operator = "-";
      numberInput.value = null;
      resultInput.value = null;
    }
  }
});

multiplyButton.addEventListener("click", () => {
  if (temp) {
    operator = "*";
    numberInput.value = null;
  } else {
    if (numberInput.value) {
      temp = Number(numberInput.value); //문자열을 숫자로
      operator = "*";
      numberInput.value = null;
      resultInput.value = null;
    }
  }
});

divideButton.addEventListener("click", () => {
  if (temp) {
    operator = "/";
    numberInput.value = null;
  } else {
    if (numberInput.value) {
      temp = Number(numberInput.value); //문자열을 숫자로
      operator = "/";
      numberInput.value = null;
      resultInput.value = null;
    }
  }
});

clearButton.addEventListener("click", () => {
  temp = null;
  operator = null;
  numberInput.value = null;
  resultInput.value = null;
});

calculateButton.addEventListener("click", () => {
  console.log(temp, operator, numberInput.value);
  if (operator) {
    if (numberInput.value) {
      if (operator === "+") {
        //밑에 temp를 여기로 올리면 안됨. 순서 떄문에, 아래로
        resultInput.value = temp + Number(numberInput.value);
        //temp = resultInput.value;
      } else if (operator === "-") {
        resultInput.value = temp - Number(numberInput.value);
        //temp = resultInput.value;
      } else if (operator === "*") {
        resultInput.value = temp * Number(numberInput.value);
        //temp = resultInput.value;
      } else if (operator === "/") {
        resultInput.value = temp / Number(numberInput.value);
        //temp = resultInput.value;
      }
      temp = Number(resultInput.value);
      //이거 안하면 + 다시 더할때 문자열 판정나서 8 + 4 = 84 나옴
    }
  } else {
    if (numberInput.value) {
      resultInput.value = temp;
    }
  }
});
