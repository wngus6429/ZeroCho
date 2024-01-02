type Animal = { breath: true };
type Poyouryu = Animal & { breed: true };
type Human = Poyouryu & { think: true };
// 타입을 상속하는 느낌으로 할수 있다.

interface W {
  breath: true;
}
// extends가 위에 타입도 사용할수 있다.
interface B extends W {
  breed: true;
}
const rr: B = { breath: true, breed: true };

const zerocho: Human = { breath: true, breed: true, think: true };

// 인터페이스와 타입 언제쓸까 구분해야함. 인터페이스는 객체지향에서 잘 사용함
const aaa: string = "hello";

// 인터페이스는 이름이 중복 가능함. 타입이랑 다름.
// 선언될때마다 합쳐짐
interface BB {
  talk: () => void;
}
interface BB {
  eat: () => void;
}
interface BB {
  shit: () => void;
}

const aq: BB = { talk() {}, eat() {}, shit() {}, sleep() {} };

interface BB {
  sleep: () => void;
}

type R = { name: string };
type T = { age: number };

type RT = R | T;

type CC = R & T;
const abb: RT = { name: "zerocho" };
// 잉여속성 검사라는 새로운 특성이 생겨서 안되는거임.
const ccc: CC = { name: "zerocho", age: 29, married: false };
