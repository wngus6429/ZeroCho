// let n = 1;
// while (n < 10) {
//   console.log("*".repeat(n));
//   n++;
// }

// let g = 1;
// while (g <= 10) {
//   console.log(" ".repeat(10 - g) + "*".repeat(g));
//   g++;
// }

// let g = 4;
// while (g >= -4) {
//   console.log(" ".repeat(Math.abs(g) / 2) + "*".repeat(5 - Math.abs(g)));
//   g -= 2;
// }
// console.log("ㅡㅡㅡㅡㅡㅡ");
// let f = 4;
// while (f >= -4) {
//   console.log(" ".repeat(Math.abs(f)) + "*".repeat(5 - Math.abs(f)));
//   f -= 2;
// }
// 빈칸 4, 별 1
// 빈칸 2, 별 3
// 빈칸 0, 별 5
// 빈칸 2, 별 2
// 빈칸 4, 별 1

// let answer = [];
// let n = 0;
// while (n <= 3) {
//   answer[n] = Math.floor(Math.random() * 10);
//   n += 1;
// }
// console.log(answer);

let gw = [];
let g = 0;
while (g < 10) {
  gw.push(g);
  g++;
  for (let f = 0; f < 3; f++) {
    gw.push("개련아");
  }
}
console.log(gw);
