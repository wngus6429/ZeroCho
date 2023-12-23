const enum EDirection {
  // 순서대로 0,1,2,3
  Up = 3, // 붙여주면 3,4,5,6
  Down = "hello",
  Left = "red",
  Right = "wow",
}
// 위는 나중에 사라진다.
// 읽기전용 readonly가 되어있다.
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const; // 이걸 붙임으로 인해 안에 값이 number아 아니라 값으로 보임.

const a = EDirection.Up;
const c = EDirection.Left;
// enum은 여러개의 변수를 하나로 묶을떄 주로 사용

// 남겨야 한다. 아래 일반, 없애야한다면 enum임.
// 웬만하면 남기는게 좋음

// dir붙임으로 인해 EDirction의 4개중에 하나가 되어야함.
function walk(dir: EDirection) {}

const obj = { a: "123", b: "hello", c: "world" } as const;
//! 값을 타입으로 쓸려고 하는게 typeof
//* type key는 a 또는 b 또는 c
//* keyof로 obj의 값의 키 a, b, c를 뽑아낸다.
// type key = keyof typeof obj;
// 이렇게 하고 위에 as const 붙임으로 인해 obj의 value만 가져온다
type key = (typeof obj)[keyof typeof obj];

//! enum 하기 싫으면 아래처럼 하는데. 타입 정의가 힘들다.
type Direction = (typeof ODirection)[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);
