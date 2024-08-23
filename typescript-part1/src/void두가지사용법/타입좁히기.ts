// 매개변수로 number혹은 string 받음.
function numOrStr(a: number | string) {
  // (a as number).toFixed(1); 위험한코드, 문자열 들어오면 망함
  //! 아래는 타입가드,
  if (typeof a === "number") {
    a.toFixed(2);
  } else {
    // a.split(",");
    a.charAt(3);
  }
  if (typeof a === "string") {
    a.charAt(3);
  }
  if (typeof a === "boolean") {
    a.toString(); //절대 실행 안됨, never형식 에러뜸.
  }
}
numOrStr("123");
numOrStr(1);

// 매개변수로 number혹은 string 받음.
function numOrNumArray(a: number | number[]) {
  //! 변수 인지 확인, Array.isArray
  if (Array.isArray(a)) {
    a.concat(4);
  } else {
    a.toFixed(3);
  }
}
numOrNumArray(123);
numOrNumArray([1, 2, 3]);

class AA {
  aaa() {}
}
class BB {
  bbb() {}
}
function aOrB(param: AA | BB) {
  if (param instanceof AA) {
    param.aaa();
  }
}
aOrB(new AA());
aOrB(new BB());

//! 이런식으로 타입을 써두는게 좋음. 타스를 위해서
const human = { type: "human" };
const dog = { type: "dog" };
const cat = { type: "cat" };
//! 위와 같은게 없으면 이런것도 좋음.
const ahuman = { talk()};
const adog = { bow()};
const acat = { meow()};
