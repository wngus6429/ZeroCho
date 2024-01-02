// 이거부터 문제가 있다.
function addd(x: string | number, y: string | number): string | number {
  return x + y;
}
//! union 이걸하면 string또는 number니까 마음대로 넣을수 있음.
// 문제는 타입추론도 제대로 안된다. 타스는 모든 가능성을 고려한다.
// addd(1,2) 결과는 숫자인데. 문자열로 인식 할수도 있음.
const result: string | number = addd(1, 2);

addd("1", 2);
addd(1, "2");
