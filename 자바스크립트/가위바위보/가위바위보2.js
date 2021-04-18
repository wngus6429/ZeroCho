const computerTag = document.querySelector("#computer");
computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`;
//위에 맨뒤에 0 0 은 이미지 좌표 위치이다.
//let coord = '0';
//객체 = 여러개의 변수를 묶어줌
//하나하나 const rock, const scissors 하면 알아보기 낭비 묶는게 나음
let computerChoice = "rock";
const rspCoord = {
  rock: "0", //바위
  scissor: "-142px", //가위
  paper: "-284px", //보
};
console.log(rspCoord.scissor); //위랑 아래랑 같다고 보면됨
console.log(rspCoord["scissor"]);
console.log(rspCoord.rock);
console.log(rspCoord["rock"]);

//setInterval - 얼마의 간격으로 계속 실행
const intervalMaker = () => {
  return setInterval(() => {
    if (computerChoice === "rock") {
      computerChoice = "scissor"; //가위
    } else if (computerChoice === "scissor") {
      computerChoice = "paper"; //보
    } else if (computerChoice === "paper") {
      computerChoice = "rock"; //바위
    }
    computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${rspCoord[computerChoice]} 0`;
  }, 200);
};

let startinterval = intervalMaker();

const rockTag = document.querySelector("#rock");
const scissorTag = document.querySelector("#scissor");
const paperTag = document.querySelector("#paper");

const score = {
  rock: 0,
  scissor: 1,
  paper: -1,
};

//중복문이 만나면 함수를 사용하거나 반복문을 사용하거나 둘중 하나
// 이걸 고차함수라 한다. 함수가 다른 함수를 리턴하는거
//중괄호 다음에 리턴이 바로오면 return 생략가능
const clickButton = (myChoice) => {
  return () => {
    const myScore = score[myChoice];
    const computerScore = score[computerChoice];
    const diff = myScore - computerScore;
    const scoreTag = document.querySelector("#score");
    let accScore = Number(scoreTag.textContent);
    if (diff === 2 || diff === -1) {
      accScore += 1;
    } else if (diff === -2 || diff === 1) {
      accScore -= 1;
    }
    scoreTag.textContent = accScore;
  };
};

rockTag.addEventListener("click", () => {
  const myScore = score.rock;
  const computerScore = score[computerChoice];
  const diff = myScore - computerScore;
  const scoreTag = document.querySelector("#score");
  let accScore = Number(scoreTag.textContent);
  if (diff === 2 || diff === -1) {
    accScore += 1;
  } else if (diff === -2 || diff === 1) {
    accScore -= 1;
  }
  scoreTag.textContent = accScore;
});

scissorTag.addEventListener("click", () => {
  const myScore = score.scissor;
  const computerScore = score[computerChoice];
  const diff = myScore - computerScore;
  const scoreTag = document.querySelector("#score");
  let accScore = Number(scoreTag.textContent);
  if (diff === 2 || diff === -1) {
    accScore += 1;
  } else if (diff === -2 || diff === 1) {
    accScore -= 1;
  }
  scoreTag.textContent = accScore;
});
paperTag.addEventListener("click", () => {
  const myScore = score.paper;
  const computerScore = score[computerChoice];
  const diff = myScore - computerScore;
  const scoreTag = document.querySelector("#score");
  let accScore = Number(scoreTag.textContent);
  if (diff === 2 || diff === -1) {
    accScore += 1;
  } else if (diff === -2 || diff === 1) {
    accScore -= 1;
  }
  scoreTag.textContent = accScore;
});

// 다른 함수를 리턴 해야하는 이유는 클릭버튼에 함수가 들어가야 해서,
// 원리는 함수를 호출했을때 그자리에 리턴값이 들어가야해서, 리턴값이 함수여야함
rockTag.addEventListener("click", clickButton("rock"));
scissorTag.addEventListener("click", clickButton("scissor"));
paperTag.addEventListener("click", clickButton("paper"));

//임의의 규칙을 만들어서 코드로 만들줄 알아야한다.
// 알고리즘을 공부하게 되면 알게된다.
//가위 : 1, 바위:0, 보:-1
//  나    가위   바위   보
// 가위    0     1     2
// 바위   -1     0     2
// 보     -2    -1     0
//비겼을떄는 0 , 이겼을떄는 2 , -1
//졌을때는 1, -2

//함수에는 return을 안 적어주면 return 이 undefined이다.
//그래서 return을 이렇게 넣어줌. 함수가 다른 함수를 리턴하게
// const clickButton = (myChoice) => {
//   return () => {
//     const myScore = score[myChoice];
//     const computerScore = score[computerChoice];
//     const diff = myScore - computerScore;
//     const scoreTag = document.querySelector("#score")
//     let accScore = Number(scoreTag.textContent)
//     if (diff === 2 || diff === -1){
//       accScore += 1;
//     }
//     else if(diff === -2 || diff === 1){
//       accScore -= 1;
//     }
//     scoreTag.textContent = accScore;
//   }
// }
// rockTag.addEventListener("click", () => {
//   let score = 0;
//   if (coord === rspCoord.rock) {
//     //비겼으니 , 아무것도 입력 안함
//   } else if (coord === rspCoord.scissor) {
//     score += 1; //이겼으니까
//   } else if (coord === rspCoord.paper) {
//     score -= 1; //졌으니까
//   }
// });
// scissorTag.addEventListener("click", () => {
//   let score = 0;
//   if (coord === rspCoord.scissor) {
//     //비겼으니
//   } else if (coord === rspCoord.paper) {
//     score += 1;
//   } else if (coord === rspCoord.rock) {
//     score -= 1;
//   }
// });
// paperTag.addEventListener("click", () => {
//   let score = 0;
//   if (coord === rspCoord.paper) {
//     //비겼으니
//   } else if (coord === rspCoord.rock) {
//     score += 1;
//   } else if (coord === rspCoord.scissor) {
//     score -= 1;
//   }
// });
