/** @format */

//input 만 value고
//div, span, button은 다 textContent 대소문자 주의
const btn = document.querySelector("#button");

const dictionary = [];
btn.addEventListener("click", () => {
  const wordTag = document.querySelector("#word"); //id word가져옴
  const word = wordTag.textContent; //값 가져옴
  const inputTag = document.querySelector("#input"); //id input가져옴
  const errorTag = document.querySelector("#error"); //id error가져옴
  const inputvalue = inputTag.value; //input 값 가져옴
  if (dictionary.includes(inputvalue)) {
    errorTag.textContent = "중복입니다";
  } else {
    if (word[word.length - 1] === inputvalue[0]) {
      wordTag.textContent = inputvalue;
      errorTag.textContent = "";
      inputTag.value = "";
      inputTag.focus();
      dictionary.push(inputvalue);
    } else {
      errorTag.textContent = "땡";
      inputTag.value = "";
      inputTag.focus();
    }
  }
});
