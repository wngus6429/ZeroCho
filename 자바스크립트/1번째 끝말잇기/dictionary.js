/** @format */

//input 만 value고 div, span, button은 다 textContent 대소문자 주의
const button = document.querySelector("#button");

button.addEventListener("click", () => {
  const wordTag = document.querySelector("#word");
  const word = wordTag.textContent; //값 가져옴
  const inputTag = document.querySelector("#input");
  const errorTag = document.querySelector("#error");
  const input = inputTag.value; //값 가져옴
  if (word[word.length - 1] === input[0]) {
      wordTag.textContent = input;
      errorTag.textContent = "";
      inputTag.value = "";
      inputTag.focus();
      dictionary.push(input);
    } else {
      errorTag.textContent = "땡";
      inputTag.value = "";
      inputTag.focus();
    }
  }
});
