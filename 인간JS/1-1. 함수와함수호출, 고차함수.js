const add = (a, b) => a + b;

function calculator(func, a, b) {
  return func(a, b);
}

console.log(add(5, 3));
console.log(calculator(add, 1, 2));

//! 아래처럼 하면 안된다.
// ()를 붙이면 함수가 실행되기 때문에 add()는
// 함수가 아니라 함수의 결과값이됨
// console.log(calculator(add(), 1, 2));

// 아래것은 가능하게 된다. 고차함수
// 함수를 인자로 받거나 함수를 리턴하는 함수를 말함
const onClick = () => {
  return () => {
    console.log("Hello");
  };
};

document.getElementById("btn").addEventListener("click", onClick());
// 결과는 아래와 같이 되어서 정상이다.
document.getElementById("btn").addEventListener("click", () => {
  console.log("Hello");
});
