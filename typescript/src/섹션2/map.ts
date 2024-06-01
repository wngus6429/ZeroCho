interface Arr<T> {
  // void는 리턴값이 없다.
  forEach(callback: (item: T, index: number) => void): void;
  // map(callback: (v: T, i: number) => T): T[];
  map<S>(callback: (v: T, i: number) => S): S[];
  //   map<S>(callback: (v: T) => S): S[];
}
const a: Arr<number> = [1, 2, 3];
const b = a.map((v, i) => v + 1); // [2, 3, 4]
const c = a.map((v, i) => v.toString()); // ["2", "3", "4"]; string[]
const d = a.map((v) => v % 2 === 0); // [false, true, false] boolean[]

const e: Arr<string> = ["1", "2", "3"];
const f = e.map((v) => +v);
