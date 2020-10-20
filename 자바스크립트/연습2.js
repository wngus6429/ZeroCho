// async function 함수네임() {
//     return 1;
//   }
// console.log(함수네임());

// 함수이름 = async() => {
//     return 32;
// }
// 함수이름().then(g => console.log(g))

// async function fg() {
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("완료!"), 1000)
//   });
//   let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)
//   console.log(result); // "완료!"
// }
// fg();

// async function f() {
//     throw new Error("야호 에러다")
//   }
// f().then(e => console.log(e))

// async function f() {
//   try {
//     let response = await fetch('http://유효하지-않은-주소');
//   } catch(err) {
//     console.log("잼잼", err); // TypeError: failed to fetch
//   }
// }
// f();

// async function f() {
//     try {
//       let response = await fetch('http://유효하지-않은-url');
//       let user = await response.json();
//     } catch(err) {
//       // fetch와 response.json에서 발행한 에러 모두를 여기서 잡습니다.
//       console.log(err);
//     }
// }
// f();

async function f() {
    let response = await fetch('http://유효하지-않은-url');
  }
  
  // f()는 거부 상태의 프라미스가 됩니다.
  f().catch(alert); // TypeError: failed to fetch // (*)