let dataset = []; //데이터창고
let tbody = document.querySelector("#table tbody");
let 중단플래그 = false;
let 열은칸 = 0;
let 코드표 = {
  연칸: -1,
  물음표: -2,
  깃발: -3,
  깃발지뢰: -4,
  물음표지뢰: -5,
  지뢰: 1,
  보통칸: 0,
};

document.querySelector("#exec").addEventListener("click", () => {
  //tbody.innerHTML = ""; //실행누르면 초기화되게끔
  //console.log(tbody);
  document.querySelector("#result").textContent = "";
  dataset = [];
  열은칸 = 0;
  중단플래그 = false;
  let hor = parseInt(document.querySelector("#hor").value);
  let ver = parseInt(document.querySelector("#ver").value);
  let mine = parseInt(document.querySelector("#mine").value);
  console.log(hor, ver, mine);

  //지뢰위치 뽑기
  let 후보군 = Array(hor * ver)
    .fill() //undefined
    .map(function (요소, 인덱스) {
      return 인덱스;
      //0부터 99까지니까
    });
  let 셔플 = [];
  //100개는 html value 10, 10 가로 세로 곱한거임
  // 100개 다 계산해서 20개 뽑는건 성능 아까우니, 애초부터 20개만 뽑게 하자 이지
  while (후보군.length > 80) {
    let 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
    셔플.push(이동값);
  }
  console.log(셔플);
  //지뢰 테이블 만들기
  let tbody = document.querySelector("#table tbody");
  for (let i = 0; i < ver; i++) {
    let arr = [];
    let tr = document.createElement("tr");
    dataset.push(arr);
    for (let j = 0; j < hor; j++) {
      arr.push(코드표.보통칸);
      let td = document.createElement("td");
      td.addEventListener("contextmenu", function (e) {
        e.preventDefault(); //마우스 오른쪽 클릭 이벤트는 contextmenu임
        let 부모tr = e.currentTarget.parentNode; //몇번쨰줄 몇번째 칸 알아내야지
        let 부모tbody = e.currentTarget.parentNode.parentNode;
        let 칸 = Array.prototype.indexOf.call(부모tr.children, td);
        let 줄 = Array.prototype.indexOf.call(부모tbody.children, tr);
        console.log(부모tr, 부모tbody, td, 칸, 줄);
        if (
          e.currentTarget.textContent === "" ||
          e.currentTarget.textContent === "X"
        ) {
          e.currentTarget.textContent = "!";
          if (dataset[줄][칸] === 코드표.지뢰) {
            dataset[줄][칸] = 코드표.깃발지뢰;
          } else {
            dataset[줄][칸] = 코드표.깃발;
          }
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
          if (dataset[줄][칸] === 코드표.지뢰) {
            dataset[줄][칸] = 코드표.물음표지뢰;
          } else {
            dataset[줄][칸] = 코드표.물음표;
          }
        } else if (e.currentTarget.textContent === "?") {
          //데이터는 빈칸일때 1을 넣어줘야함.
          if (
            dataset[줄][칸] === 코드표.지뢰 ||
            dataset[줄][칸] === 코드표.깃발지뢰 ||
            dataset[줄][칸] === 코드표.물음표지뢰
          ) {
            e.currentTarget.textContent = "X";
          } //화면과 데이터는 다른거임.
          else {
            e.currentTarget.textContent = "";
          }
        }
      });
      td.addEventListener("click", (e) => {
        //클릭했을때 주변 지뢰 개수
        if (중단플래그) {
          return; //return하면 함수가 끝나서 밑에것들이 실행이 안됨
        }
        let 부모tr = e.currentTarget.parentNode; //몇번쨰줄 몇번째 칸 알아내야지
        let 부모tbody = e.currentTarget.parentNode.parentNode;
        let 칸 = Array.prototype.indexOf.call(부모tr.children, td);
        let 줄 = Array.prototype.indexOf.call(부모tbody.children, tr);
        if (
          [
            코드표.연칸,
            코드표.깃발,
            코드표.깃발,
            코드표.물음표지뢰,
            코드표.물음표,
          ].includes(dataset[줄][칸])
        ) {
          return;
        }
        //클릭했을때
        e.currentTarget.classList.add("opend");
        열은칸 += 1;
        if (dataset[줄][칸] === 코드표.지뢰) {
          e.currentTarget.textContent = "펑";
          document.querySelector("#result").textContent = "실패~!";
          중단플래그 = true;
        } else {
          let 주변 = [dataset[줄][칸 - 1], dataset[줄][칸 + 1]];
          if (dataset[줄 - 1]) {
            주변 = 주변.concat(
              dataset[줄 - 1][칸 - 1],
              dataset[줄 - 1][칸],
              dataset[줄 - 1][칸 + 1]
            ); //사실 push도 가능함
          } // concat은 배열을 합해서 새로운 배열을 만들어낸다
          if (dataset[줄 + 1]) {
            주변 = 주변.concat(
              dataset[줄 + 1][칸 - 1],
              dataset[줄 + 1][칸],
              dataset[줄 + 1][칸 + 1]
            );
          }
          let 주변지뢰개수 = 주변.filter(function (v) {
            return v === 코드표.지뢰;
          }).length;
          //주변지뢰개수가 거짓인 값:false, "", 0, null, undefined, NaN 면 뒤에 " "를 써라
          e.currentTarget.textContent = 주변지뢰개수 || "";
          dataset[줄][칸] = 1;
          if (주변지뢰개수 === 0) {
            console.log("주변을 엽니다");
            //주변 8칸 동시 오픈
            //tbody.children[줄].children[칸 - 1].click();
            let 주변칸 = [];
            if (tbody.children[줄 - 1]) {
              주변칸 = 주변칸.concat([
                tbody.children[줄 - 1].children[칸 - 1],
                tbody.children[줄 - 1].children[칸],
                tbody.children[줄 - 1].children[칸 + 1],
              ]);
            }
            주변칸 = 주변칸.concat([
              tbody.children[줄].children[칸 - 1],
              tbody.children[줄].children[칸 + 1],
            ]);
            if (tbody.children[줄 + 1]) {
              주변칸 = 주변칸.concat([
                tbody.children[줄 + 1].children[칸 - 1],
                tbody.children[줄 + 1].children[칸],
                tbody.children[줄 + 1].children[칸 + 1],
              ]);
            }
            //.filter((v) => !!v) 배열에서 undefined나 null, 0, 빈문자열 이런거 제거하는 코드
            주변칸
              .filter(function (v) {
                return !!v;
              })
              .forEach(function (옆칸) {
                let 부모tr = e.currentTarget.parentNode; //몇번쨰줄 몇번째 칸 알아내야지
                let 부모tbody = e.currentTarget.parentNode.parentNode;
                let 옆칸칸 = Array.prototype.indexOf.call(
                  부모tr.children,
                  옆칸
                );
                let 옆칸줄 = Array.prototype.indexOf.call(
                  부모tbody.children,
                  부모tr
                );
                if (dataset[옆칸줄][옆칸칸] !== 1) {
                  옆칸.click();
                }
              });
          }
        }
        console.log(열은칸, hor * ver - mine);
        if (열은칸 === hor * ver - mine) {
          중단플래그 = true;
          document.querySelector("#result").textContent = "승리~!";
        }
      });
      tr.appendChild(td);
      //td.textContent = 1;
    }
    tbody.appendChild(tr);
  }
  console.log(dataset);
  //지뢰 심기 예시:59 , 배열에는 - 가 나오면 안되니 주의
  for (let k = 0; k < 셔플.length; k++) {
    let 세로 = Math.floor(셔플[k] / 10); // 예 6 , 자스는 0부터 세니까
    let 가로 = 셔플[k] % 10; //예 8 , 자스는 0부터 세니까
    console.log(세로, 가로);
    tbody.children[세로].children[가로].textContent = "X"; //화면
    //children으로 자식 태그 접근 가능, tbody안에 children이면 tr, 여기에 또 children하면 td이다
    dataset[세로][가로] = "X"; //2차원 배열
    //윈도우즈 지뢰찾기는 첫번째 클릭은 무조건 지뢰 위치가 아님
  }
  console.log(dataset);
});

function 재귀함수(숫자) {
  console.log(숫자);
  if (숫자 < 5) {
    재귀함수(숫자 + 1);
  }
}

재귀함수(1);

//코드 짜는 능력을 기를려면 순서도를 그려야한다. 한마디로 설계서
//마우스 오른쪽 클릭 이벤트는 contextmenu임

//e.currentTarget
//e.target

//let 칸 = 부모tr.children.indexOf(td); 자기자신 위치를 알려고 한건데.
// 문제는 지금 표가 배열이 아니라서 indexOf 사용 불가, children은 유사배열
// 그래서 위에 보면 Array.prototype.indexOf.call 이걸 사용한것
//배열이 아닌 유사배열에 배열의 메서드를 사용하고 싶을 때 씁니다.

//React, angular vue 사용이유. 화면과 데이터를 일치시키기 위해

//e.currentTarget과 e.target은 다르다.
//e.currentTarget은 이벤트 리스너가 달린놈이 나오고 tbody
//e.target은 실제 이벤트가 발생한곳 여기서는 td
