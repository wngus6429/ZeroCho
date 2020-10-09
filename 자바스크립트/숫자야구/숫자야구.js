/** @format */

const input = document.querySelector("#input");
const check = document.querySelector("#check");
const logs = document.querySelector("#logs");
// 4자리 숫자 생성
// let answer = [
//   Math.floor(Math.random() * 10),
//   Math.floor(Math.random() * 10),
//   Math.floor(Math.random() * 10),
//   Math.floor(Math.random() * 10),
//   //밑에서 join 하면 어짜피 숫자가 문자열로 바뀌기 때문에 앞에 String뺌
// ];
// Number(answer.join("")); //배열을 문자열로 바꾸는게 join

let answer = [];
let n = 0;
while (n <= 3) {
  answer[n] = Math.floor(Math.random() * 10);
  n++; // n = n + 1, N += 1
}
console.log(answer);
// 조건문 안에 " " (빈 문자열), 0, NaN, false, undefined, null 은 false이다
let count = 0;
check.addEventListener("click", () => {
  const value = input.value; //input이니까 문자열
  if (value && value.length === 4) {
    if (answer === value) {
    }
  }
});

// const number1 = String(Math.floor(Math.random() * 10));
// const number2 = String(Math.floor(Math.random() * 10));
// const number3 = String(Math.floor(Math.random() * 10));
// const number4 = String(Math.floor(Math.random() * 10));
// let answer = Number(number1 + number2 + number3 + number4);
