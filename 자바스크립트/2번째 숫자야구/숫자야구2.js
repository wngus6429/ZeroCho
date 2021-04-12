/** @format */

const input = document.querySelector("#input");
const check = document.querySelector("#check");
const logs = document.querySelector("#logs");

// 고급 문법 let numbers = Array(10).fill().map((v, i) => i)
//let numbers = [0,1,2,3,4,5,6,7,8,9];
let numbers = [];
for (let n = 0; n <= 9; n++) {
  numbers.push(n);
}
let answer = [];
for (let n = 0; n <= 3; n++) {
  const index = Math.floor(Math.random() * numbers.length);
  //-n을 안하면 언디파인 나옴. numbers의 길이는 줄어드는데. Math.random은 10까지 돌리니까
  answer.push(numbers[index]); //0~9까지 정수
  //  console.log(answer)
  numbers.splice(index, 1); //splice로 삭제
  //여기서 사용한 n은 목숨이 여기 블럭 안임. 블럭 끝나면 죽는거
}
console.log(answer);

let count = 0;
check.addEventListener("click", () => {
  const value = input.value; //input이니까 문자열
  if (value && value.length === 4) {
    if (answer.join("") === value) {
      //answer === value.split("")할수 있지만 객체 끼리는 값이 같아도 다르다고 나옴
      //그래서 join으로 문자열을 만들어서 비교한다.
      logs.textContent = "HomeRun";
      //logs.appendChild(document.createTextNode("HomeRun"))
    } else {
      console.log("다르다");
      let strike = 0;
      let ball = 0;
      //[ ]구조분해 할당
      //첫번쨰 for문 1번 돌면 밑에 4번, 이런식
      for (const [aIndex, aNumber] of answer.entries()) {
        console.log(aIndex, aNumber); //value.split 문자를 배열로 만들고 entries
        for (const [iIndex, iString] of input.value.split("").entries()) {
          console.log(iIndex, iString);
          //console.log(aNumber, iString)
          if (aNumber === Number(iString)) {
            if (aIndex === iIndex) {
              strike += 1;
            } else {
              ball += 1;
            }
          }
        }
      }
      //최신 문법이라 한다. 백틱이랑, 태그도 이렇게 같이 추가 가능
      logs.append(
        `${input.value}:${strike} strike ${ball} ball`,
        document.createElement("br")
      );
      if (count > 10) {
        logs.appendChild(
          document.createTextNode(`Game Over:${answer.join("")}`)
        );
      } else {
        count += 1;
      }
    }
    //appendChild는 뭔가 추가할때 사용
    // const message = document.createTextNode(`${input.value}:${strike} strike ${ball} ball`)
    //   logs.appendChild(message)
    //   logs.appendChild(document.createElement("br"));
    //   if(count > 10){
    //     logs.appendChild(document.createTextNode(`Game Over:${answer.join("")}`))
    //   } else {
    //     count += 1
    //   }
  }
});

//entries는 배열 뒤에만 붙일수 있음

//배열은 자료형이 객체이다

// 4자리 숫자 생성
// let answer = [
//   Math.floor(Math.random() * 10),
//   Math.floor(Math.random() * 10),
//   Math.floor(Math.random() * 10),
//   Math.floor(Math.random() * 10),
//   //밑에서 join 하면 어짜피 숫자가 문자열로 바뀌기 때문에 앞에 String뺌
// ];
// Number(answer.join("")); //배열을 문자열로 바꾸는게 join

// let n = 0 //4번 돌리겟지
// while (n <= 3){
//   const index = Math.floor(Math.random() * (10 - n))
//   //-n을 안하면 언디파인 나옴. numbers의 길이는 줄어드는데. Math.random은 10까지 돌리니까
//   answer.push(numbers[index]) //0~9까지 정수
//   numbers.splice(index, 1) //splice로 삭제
//   n += 1
// }

//push 값 넣는거.

// 조건문 안에 " " (빈 문자열), 0, NaN, false, undefined, null 은 false이다

// const number1 = String(Math.floor(Math.random() * 10));
// const number2 = String(Math.floor(Math.random() * 10));
// const number3 = String(Math.floor(Math.random() * 10));
// const number4 = String(Math.floor(Math.random() * 10));
// let answerg = Number(number1 + number2 + number3 + number4);
// console.log(answerg)

// let good = []
// let n = 0;
// while (n <= 50) {
//   good[n] = Math.floor(Math.random() * 100);
//   n++; // n = n + 1, N += 1
// }
// good.sort((a, b) => { return a - b })
// console.log(good);
