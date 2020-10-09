/** @format */

//input 태그의 값을 가져올려면 뒤에 .value
//span에 데이터를 넣으려면 textContent
//const 한것들을 안에 넣는 이유는 화면 새로고침 했을때 동시에 실행되기 때문
//빈 값이 a, b 는 새로고침 기준 존재 안함, result는 이미 존재함 에 들어간다.
//클릭을 했을때 값을 가져와야 하기때문에 안에 넣었다.
const result = document.querySelector("#result");
document.querySelector("#click").addEventListener("click", () => {
  const a = document.querySelector("#first").value;
  const b = document.querySelector("#second").value;
  //a가 있는가? , 있으면 true
  if (a) {
    if (b) {
      const c = a * b;
      result.textContent = c;
    } else {
      result.textContent = "두 값 입력해";
    }
  } else {
    result.textContent = "첫번째 값 입력해";
  }
});
