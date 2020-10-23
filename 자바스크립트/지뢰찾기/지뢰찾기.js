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
  let dataset = [];
  let tbody = document.querySelector("#table tbody");
  for (let i = 0; i < ver; i++) {
    let arr = [];
    let tr = document.createElement("tr");
    dataset.push(arr);
    for (let j = 0; j < hor; j++) {
      arr.push(1);
      let td = document.createElement("td");
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
  }
});

//코드 짜는 능력을 기를려면 순서도를 그려야한다. 한마디로 설계서
