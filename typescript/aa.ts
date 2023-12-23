function addd(x: string | number, y: string | number): string | number {
  return x + y;
}
//! union 이걸하면 string또는 number니까 마음대로 넣을수 있음.
// 문제는 타입추론도 제대로 안된다. 타스는 모든 가능성을 고려한다.
const result: string = addd(1, 2);
addd("1", 2);
addd(1, "2");
