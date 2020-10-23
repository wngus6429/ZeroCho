let body = document.body;
let table = document.createElement("table");
let 결과 = document.createElement("div")

let 줄들 = [];
let 칸들 = []
let 턴 = "X";

const 비동기콜백 = (event) => {
    console.log(event.target) //칸
    console.log(event.target.parentNode) //줄
    console.log(event.target.parentNode.parentNode) //테이블

    let 몇줄 = 줄들.indexOf(event.target.parentNode)
    console.log("몇줄", 몇줄)
    let 몇칸 = 칸들[몇줄].indexOf(event.target)
    console.log("몇칸", 몇칸)

    if(칸들[몇줄][몇칸].textContent !== '') { //칸이 이미 채워져 있는가
        console.log("빈칸아님")
    } else {
        console.log("빈칸이다")
        칸들[몇줄][몇칸].textContent = 턴;
        //세칸 다 채웠나?
      let 다참 = false;
        //가로줄 검사
      if(칸들[몇줄][0].textContent === 턴 &&
         칸들[몇줄][1].textContent === 턴 &&
         칸들[몇줄][2].textContent === 턴
      ){
        다참 = true;
      }
      //세로줄 검사
      if(칸들[0][몇칸].textContent === 턴 &&
         칸들[1][몇칸].textContent === 턴 &&
         칸들[2][몇칸].textContent === 턴
      ){
        다참 = true;    
      }
      //대각선 검사 , abs는 절대값.무조건 0 이나 양수로 만듬
      if(몇줄 - 몇칸 === 0){ //대각선 검사 필요한 경우
        if(칸들[0][0].textContent === 턴 &&
           칸들[1][1].textContent === 턴 &&
           칸들[2][2].textContent === 턴
        ){
          다참 = true;
        }
      }
      if(Math.abs(몇줄 - 몇칸 === 2)){ //대각선 검사 필요한 경우
        if(칸들[0][2].textContent === 턴 &&
           칸들[1][1].textContent === 턴 &&
           칸들[2][0].textContent === 턴
      ){
        다참 = true;
      }
      }
    
    // 다 찼으면
    if(다참){
      console.log(턴 + "님이 승리")
      결과.textContent = 턴 + "님이 승리~!"
      //초기화
      턴 = "X"
      칸들.forEach(function(줄){
        줄.forEach(function(칸){
          칸.textContent = "";
        });
      });
    } else { //다 안 찼으면
        if (턴 === "X"){
          턴 = "O";
        } else{
          턴 = "X";
        }
    }
  }  
}
// let 줄들 = [];
// let 칸들 = []
// let 턴 = "X";
// 칸들 = [
// [첫칸, 두칸, 세칸],
// [첫칸, 두칸, 세칸],
// [첫칸, 두칸, 세칸]
// ]
for(i = 1; i <= 3; i++){
  let 줄 = document.createElement("tr")
  줄들.push(줄)
  //줄.textContent = "줄"
  칸들.push([]);
  console.log(칸들)
    for(let j = 1; j<=3; j++){
    let 칸 = document.createElement("td")
    칸.addEventListener("click", 비동기콜백)
    console.log(칸)
    칸들[i - 1].push(칸);
    //칸.textContent = "칸"
    줄.appendChild(칸);
}
table.appendChild(줄)
}
body.appendChild(table)
body.appendChild(결과)
//console.log(줄들,칸들)






// let 배열 = [1,2,3,4,5]
// let 배열 = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],
//  ]
// //배열안에 배열 2차원