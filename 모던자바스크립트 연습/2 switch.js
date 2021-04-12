let a = 4;

switch (a) {
  case 4:
    console.log("계산이 맞습니다!");
    break;

  case 3: // (*) 두 case문을 묶음
  case 5:
    console.log("계산이 틀립니다!");
    console.log("수학 수업을 다시 들어보는걸 권유 드립니다.");
    break;

  default:
    console.log("계산 결과가 이상하네요.");
}

if (browser === "Edge") {
  alert("Edge사용하고 있네");
} else if (
  browser === "chrome" ||
  browser === "firefox" ||
  browser === "safari" ||
  browser === "opera"
) {
  alert("저희 서비스가 지원하는걸 사용하고 있네요");
} else {
  alert("되겟노?");
}

let a = +prompt("a는??");
switch (a) {
  case 0:
    console.log(0);
    break;
  case 1:
    console.log(1);
    break;
  case 2:
  case 3:
    console.log(2, 3);
  default:
    break;
}
