// 프로미스는 Promise<결과값> 이렇게 타입으로 표시함
const p1 = Promise.resolve(1)
  .then((a) => a + 1)
  .then((a) => a + 1)
  .then((a) => a.toString());
const p2 = Promise.resolve(2);
const p3 = new Promise((res, rej) => {
  setTimeout(res, 1000); // [ '3', 2, undefined ]
});

Promise.all([p1, p2, p3]).then((result) => {
  console.log(result);
});
// T = [p1, p2, p3]
// keyof T = 0 | 1 | 2 | length

const arr = [1, 2, 3] as const;
type Arr = keyof typeof arr;
const key: Arr = 4;
