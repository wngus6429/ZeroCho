interface A {
  a: string;
}
interface A {
  b: string;
}
const obj1: A = { a: "hello", b: "world" };

//타입앨리어스는 이름 중복이 안된다.
type B = { a: string };
type B = { b: string };
