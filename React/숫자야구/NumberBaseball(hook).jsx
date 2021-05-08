import React, { useState, memo, useRef } from "react";
import TryHook from "./TryHook";

//훅스로 바꿔도 애는 클래스때의 위치 고수해도 됨
function getNumbers() {
  // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}
//밑에서 input 입력 할때 이 함수가 계속 실행되는데
//이때 필요한게 useMemo, useCallback 이다

const NumberBaseballHook = memo(() => {
  const [result, setresult] = useState("");
  const [value, setvalue] = useState("");
  const [answer, setanswer] = useState(getNumbers());
  const [tries, settries] = useState([]);
  const inputREF = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join("")) {
      setresult("홈런");
      settries((prevTries) => {
        return [...prevTries, { try: value, result: "홈런!" }];
      });
      alert("게임을 다시 시작합니다.");
      setvalue("");
      setanswer(getNumbers());
      settries([]);
      inputREF.current.focus();
    } else {
      //답이 틀렸으면
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setresult(`10번넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다.`);
        alert("게임을 다시 시작합니다.");
        setvalue("");
        setanswer(getNumbers());
        settries([]);
        inputREF.current.focus();
      } else {
        //10번 틀리기 전에는 기회더주고 몇볼 몇스트라이크인지 알려주고
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        settries((prevTries) => [...prevTries, { try: value, result: `${strike} 스트라이크 ${ball} 볼` }]);
        setvalue("");
        inputREF.current.focus();
      }
    }
  };

  const onChangeInput = (e) => {
    console.log(answer);
    setvalue(e.target.value);
  };
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {/* v.try랑 v.result가 들어가 있을거임 */}
        {tries.map((v, i) => {
          return <TryHook key={`${i + 1}차 시도:`} tryInfo={v} />; //5번 실행되겟지
        })}
      </ul>
      {/* 반복되는걸 배열로 만들어라 */}
    </>
  );
});

export default NumberBaseballHook;
