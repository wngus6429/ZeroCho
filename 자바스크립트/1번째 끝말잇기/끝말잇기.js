/** @format */

//input 만 value고 div, span, button은 다 textContent 대소문자 주의
const btn = document.querySelector("#button");

const dictionary = [];
btn.addEventListener("click", () => {
  const wordTag = document.querySelector("#word");
  const word = wordTag.textContent; //값 가져옴
  const inputTag = document.querySelector("#input");
  const errorTag = document.querySelector("#error");
  const input = inputTag.value; //값 가져옴
  if (dictionary.includes(input)) {
    errorTag.textContent = "중복입니다";
  } else {
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

// 끝난 순간에 기존에 있던 변수들이 사라진다. 메모리 저장공간이 사라지는거지
// 마지막 } 부분에서 위에꺼 꼴까닥

// btn.addEventListener("click", () => {
//   const word = document.querySelector("#word").textContent; //값 가져옴
//   const input = document.querySelector("#input").value; //값 가져옴
//   const lastIndex = word.length - 1; //마지막 글자 번호 구함
//   console.log(word[lastIndex]);
//   const w = word[lastIndex];
//   const i = input[0];
//   if (w === i) {
//     document.querySelector("#word").textContent = input;
//     document.querySelector("#error").textContent = "";
//     document.querySelector("#input").value = "";
//     document.querySelector("#input").focus();
//   } else {
//     document.querySelector("#error").textContent = "땡";
//     document.querySelector("#input").value = "";
//     document.querySelector("#input").focus();
//   }
// });
