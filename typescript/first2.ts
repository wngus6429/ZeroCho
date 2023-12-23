type World = "world" | "hell";
const a: World = "world";

const b = `hello ${a}`;
// type Greeting = 'hello world';
// 타입에서도 템플릿 리터럴 (백틱) 사용이 가능하다.
type Greeting = `hello ${World}`;
const c: Greeting = "hello hell";

let arr: string[] = [];
let arr2: Array<string> = [];
function rest(...args: string[]) {
  console.log(args); // [1,2,3]
}
rest("1", "2", "3");

function rest2(a, ...args: string[]) {
  console.log(a, args); // 1, [2,3]
}
rest2("1", "2", "3");

//! 튜플, 각자 지켜야함
const tuple: [string, number] = ["1", 1];
tuple[2] = "hello"; // 애는 막는데
tuple.push("hello"); // push 애는 못 막음. 병신임 ㅋㅋ
