// 함수간에 서로 대입 가능한가??

function a(x: string | number): number {
  return +x;
}
a("1"); // 1

type B = (x: string) => number | string; // 이게 가능하다고
const b: B = a;

// 리턴값은 넓은대로, 매개변수는 좁은 타입이면 대입가능
