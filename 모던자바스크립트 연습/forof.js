let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0); // 650
}
console.log("확인", sumSalaries(salaries));

// function sumSalaries(money) {
//   let sum = 0;
//   for (let sal of Object.values(money)) {
//     sum += sal;
//   }
//   return sum;
// }
