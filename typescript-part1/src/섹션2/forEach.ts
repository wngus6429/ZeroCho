interface Arr<T> {
  // void는 리턴값이 없다.
  forEach(callback: (item: T) => void): void;
}
const a: Arr<number> = [1, 2, 3];
a.forEach((item) => {
  console.log(item);
  item.toFixed(1);
});
a.forEach((item) => {
  console.log(item);
  return "3";
});

const b: Arr<string> = ["1", "2", "3"];
b.forEach((item) => {
  console.log(item);
  item.charAt(3);
});
b.forEach((item) => {
  console.log(item);
  return "3";
});
