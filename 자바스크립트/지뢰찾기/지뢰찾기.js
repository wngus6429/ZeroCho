let tbody = document.querySelector("#table tbody");
let dataset = []; //데이터창고

document.querySelector("#exec").addEventListener("click", function () {
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
      arr.push(1);
      let td = document.createElement("td");
      td.addEventListener("contextmenu", function (e) {
        e.preventDefault(); //마우스 오른쪽 클릭 이벤트는 contextmenu임
        let 부모tr = e.currentTarget.parentNode; //몇번쨰줄 몇번째 칸 알아내야지
        let 부모tbody = e.currentTarget.parentNode.parentNode;
        let 칸 = Array.prototype.indexOf.call(부모tr.children, td);
        let 줄 = Array.prototype.indexOf.call(부모tbody.children, tr);
        console.log(부모tr, 부모tbody, td, 칸, 줄);
        td.textContent = "!";
        dataset[줄][칸] = "!"; //태그 화면으로 헀으니 데이터 쪽에도 적용
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

//코드 짜는 능력을 기를려면 순서도를 그려야한다. 한마디로 설계서
//마우스 오른쪽 클릭 이벤트는 contextmenu임

//e.currentTarget
//e.target

//let 칸 = 부모tr.children.indexOf(td); 자기자신 위치를 알려고 한건데.
// 문제는 지금 표가 배열이 아니라서 indexOf 사용 불가, children은 유사배열
// 그래서 위에 보면 Array.prototype.indexOf.call 이걸 사용한것
//배열이 아닌 유사배열에 배열의 메서드를 사용하고 싶을 때 씁니다.

//React, angular vue 사용이유. 화면과 데이터를 일치시키기 위해
