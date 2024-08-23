let aa = "hello";
aa = 444;
const ab: number = 5;
// function add(x: number, y: number): number {
//   return x + y;
// }
// const add: (x: number, y: number) => number = (x, y) => x + y;
type Add = (x: number, y: number) => number;
const add: Add = (x, y) => x + y;

const obj2: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

try {
  const array: string[] = [];
  array.push("hello");
} catch (error) {
  error;
}

// const head:Element = document.querySelector('#head')
// console.log(head);

// <div id="header"></div>
// !의 역할은 head에 추천 null이 사라진다. 무조건 존재한다는뜻 나중에 사라짐
//* 근데 비추천임. !를 쓰는것보다 if 조건문을 아래에 쓰자
// const head = document.querySelector('#head')!;
const head = document.querySelector("#head");
// head.innerHTML = "hello"; //이렇게 하면 에러남. null나올수도 있다고
if (head) {
  head.innerHTML = "Hello";
}
//! 소문자 string 써야함, 대문자 String쓰면 지옥임.
const e: string = "hello";
const f: String = "hell";
