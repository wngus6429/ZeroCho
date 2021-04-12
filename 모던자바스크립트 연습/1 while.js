// let i = 0
// while (i < 100){
//     console.log("확인")
//     i++;
// }

// let g = 5
// while (g){
//     console.log("확인")
//     g--;
// }

// let i = 0;
// do {
//   console.log(i);
//   i++;
// } while(i < 3);

// let w = 0;
// for (w = 0; w < 20; w++) {
//   // 기존에 정의된 변수 사용
//   if (w % 2 === 0) {
//     continue;
//   }
//   console.log(w); // 0, 1, 2
// }
// console.log("여기", w); // 3, 반복문 밖에서 선언한 변수이므로 사용할 수 있음

// for (let f = 0; f < 10; f++) {
//   if (f % 2) {
//     console.log(f);
//   }
// }

// for (let i = 0; i < 3; i++) {
//   for (let j = 0; j < 5; j++) {
//     console.log("아이", i, "제이", j);
//   }
// }

// for (let i = 0; i <= 10; i++) {
//   if (i > 0) {
//     if (i % 2 === 0) {
//       console.log(i);
//     }
//   }
// }
// console.log("//////////////////");
// let g = 0;
// while (g < 3) {
//   console.log(g);
//   g++;
// }

let n = 10;
nextPrime: for (let i = 2; i <= n; i++) {
  // 각 i에 대하여 반복문을 돌림
  for (let j = 2; j < i; j++) {
    // 제수(나눗수)를 찾음
    if (i % j == 0) continue nextPrime; // 소수가 아니므로 다음 i로 넘어감
  }
  console.log(i); // 소수
}
