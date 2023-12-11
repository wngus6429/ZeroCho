let a = 'hello';
a = 444;
const a: number = 5;
// function add(x: number, y: number): number {
//   return x + y;
// }
// const add: (x: number, y: number) => number = (x, y) => x + y;
type Add = (x: number, y: number) => number;
const add: Add = (x, y) => x + y;

const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };
