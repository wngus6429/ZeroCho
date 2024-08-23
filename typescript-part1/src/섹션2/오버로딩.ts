// function add(x: number, y: number): number;
// function add(x: string, y: string): string;
// function add(x: number | string, y: number | string) {
//   return x + y;
// }

declare function add(x: number, y: number): number;
declare function add(x: number, y: number, z: number): number;

// declare function add(x: number, y: number, z?: number): number;

add(1, 2);
add(2, 3, 4);

interface Add {
  (x: number, y: number): number;
  (x: string, y: string): string;
}
const add: Add = (x: any, y: any) => x + y;

// 각각의 경우를 여러번 적어서 아무나 걸려라 하는거임 , 오버로딩
class A {
  add(x: number, y: number): number;
  add(x: string, y: string): string;
  add(x: any, y: any) {
    return x + y;
  }
}
const c = new A().add("1", "2");
