let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

function sumSalaries(money) {
  let sum = 0;
  for (let sal in money) {
    console.log(sal);
    sum += money[sal];
  }
  return sum;
}

console.log("확인", sumSalaries(salaries));
