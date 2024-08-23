interface Arr<T> {
  // void는 리턴값이 없다.
  forEach(callback: (item: T, index: number) => void): void;
  map<S>(callback: (v: T, i: number) => S): S[];
  //   filter(callback: (v: T) => T): T[];
  filter<S extends T>(callback: (v: T) => v is S): S[];
}
const a: Arr<number> = [1, 2, 3];

const b = a.filter((v): v is number => v % 2 === 0); // [2] number[]

const c: Arr<number | string> = [1, "2", 3, "4", 5];
const d = c.filter((v): v is string => typeof v === "string"); // ["2", "4"] string[]
const predicate = (v: string | number): v is number => typeof v === "number";
const f = c.filter(predicate); // [1, 3, 5] number[]
const e = c.filter((v): v is number => typeof v === "number"); // [1, 3, 5] number[]
