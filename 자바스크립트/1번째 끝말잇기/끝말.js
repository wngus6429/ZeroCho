const btn = document.querySelector("#button"); //객체를 저장한 변수

btn.addEventListener("click", () => {
  let wordTag = document.querySelector("#word");
  let word = wordTag.textContent;

  let inputTag = document.querySelector("#input");
  let errorTag = document.querySelector("#error");
  let input = inputTag.value;

  const lastIndex = word.length - 1;
  const w = word[lastIndex];
  const i = input[0];
  if (w === i) {
    wordTag.textContent = input;
    errorTag.textContent = "";
    inputTag.value = "";
    inputTag.focus();
  } else {
    errorTag.textContent = "틀렸다";
    inputTag.value = "";
    inputTag.focus();
  }
});

// 끝난 순간에 기존에 있던 변수들이 사라진다. 메모리 저장공간이 사라지는거지
// 마지막 } 부분에서 위에꺼 꼴까닥

// if( w === i ){
//     document.querySelector('#word').textContent = input ;
// //위에 변수 word로 할 수 없음. 태그가 들어있는게 아니라 값이 들어잇음
//     document.querySelector('#error').textContent = '' ;
//     document.querySelector('#input').value = '' ;
//     document.querySelector('#input').focus(); //자동커서
// } else {
//     document.querySelector('#error').textContent = "틀렸다" ;
//     document.querySelector('#input').value = '' ;
//     document.querySelector('#input').focus();
// }
