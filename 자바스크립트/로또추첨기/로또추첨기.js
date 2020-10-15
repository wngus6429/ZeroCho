
const candidate = Array(45).fill().map((index, number) => number + 1)
console.log(candidate)
//fill 은 배열을 만들기 위해, Array(45)하면 length 는 생기는데 empty 배열
//fill("1") 하면 안에 45개 배열 안에 모두 "1"이 들어감
//하지만 fill 하면 undefined이지만 45개의 공간이 생긴다.
//매서드 체이닝 (연달아서 기능을 만듬)
//반복문 적는게 힘들다면 하나하나 다 코딩해보고 줄이는 방법도 있음.
//반복문 종류 while, for, forEach, for of , for in, map도 반복문이긴 하지
//do while, filter, splice, slice, textContent등등
const shuffle = [];
while(candidate.length > 0){
    const random = Math.floor(Math.random() * candidate.length)
    const spliceArray = candidate.splice(random, 1);
    const value = spliceArray[0];
    shuffle.push(value)
}
console.log(shuffle)

const winBalls = shuffle.slice(0, 6).sort((a, b)=> a - b); //당첨번호
//앞에서 리턴하는 값이 0보다 크면 , 자리를 바꾼다. 
const bonus = shuffle[6]; //7번째 보너스
console.log(winBalls);
console.log(bonus);

function colorball(number, tag){
    if (number < 10){
    tag.style.backgroundColor = "red"}
    else if (number < 20){
        tag.style.backgroundColor = "orange"
    }
    else if (number < 30){
        tag.style.backgroundColor = "yellow"
    }
    else if (number < 40){
        tag.style.backgroundColor = "blue"
        tag.style.color = "white"
    }
    else{
        tag.style.backgroundColor = "black"
        tag.style.color = "white"
    }
}

const resultTag = document.querySelector("#result")
// for(let i=0; i<6; i++){
//     setTimeout(() =>{
//     const ball = document.createElement('div')
//     colorball(winBalls[i], ball)
//     ball.className = "ball";
//     ball.textContent = winBalls[i];
//     resultTag.appendChild(ball);//그냥 append도 됨
// }, 1000 * (i + 1))}
//i가 0도 있으니 +1 을 해준것

//map으로 써도 정상 작동됨. 
//맵은 반복문이며 1대1 에 좀 더 초첨이 맞춰져 있음.
//forEach는 1,2,3,4 단순반복에 좀 더 특화
//리턴이 있으면 map이 좋고 없으면 forEach가 좋다
winBalls.forEach((number, index)=>{
    setTimeout(() =>{
        const ball = document.createElement('div')
        colorball(number, ball)
        ball.className = "ball";
        ball.textContent = number;
        resultTag.appendChild(ball);//그냥 append도 됨
    }, 1000 * (index + 1))
})

const bonusTag = document.querySelector("#bonus")
setTimeout(() =>{
  const bonusBall = document.createElement('div')
  bonusBall.className = "ball";
  colorball(bonus, bonusBall)
  bonusBall.textContent = bonus;
  bonusTag.appendChild(bonusBall);//그냥 append도 됨
 }, 7000);


//10개를 아예 처음부터 섞어서 앞에서 부터 뽑기


// const resultTag = document.querySelector("#result")
// for(let i=0; i<6; i++){
//     const ball = document.createElement('div')
//     if (winBalls[i] < 10){
//     ball.style.backgroundColor = "red"}
//     else if (winBalls[i] < 20){
//         ball.style.backgroundColor = "orange"
//     }
//     else if (winBalls[i] < 30){
//         ball.style.backgroundColor = "yellow"
//     }
//     else if (winBalls[i] < 40){
//         ball.style.backgroundColor = "blue"
//         ball.style.color = "white"
//     }
//     else{
//         ball.style.backgroundColor = "black"
//         ball.style.color = "white"
//     }
//     ball.className = "ball";
//     ball.textContent = winBalls[i];
//     resultTag.appendChild(ball);//그냥 append도 됨
// }

// const bonusTag = document.querySelector("#bonus")
// const bonusBall = document.createElement('div')
// bonusBall.className = "ball";
// if (bonus < 10){
//     bonusBall.style.backgroundColor = "red"}
//     else if (bonus < 20){
//         bonusBall.style.backgroundColor = "orange"
//     }
//     else if (bonus < 30){
//         bonusBall.style.backgroundColor = "yellow"
//     }
//     else if (bonus < 40){
//         bonusBall.style.backgroundColor = "blue"
//         bonusBall.style.color = "white"
//     }
//     else{
//         bonusBall.style.backgroundColor = "black"
//         bonusBall.style.color = "white"
//     }
    
// bonusBall.textContent = bonus;
// bonusTag.appendChild(bonusBall);//그냥 append도 됨