import React, { useState, useRef } from "react";

const ResponseCheckHooks = () => {
  const [state, setstate] = useState("waiting");
  const [message, setmessage] = useState("클릭해서 시작하세요");
  const [result, setresult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();
  //훅은 this의 속성을 ref로 표현한다.
  //ref 안에는 current가 있으니까 써줘야함

  //state는 리턴부분이 다시 실행되지만,
  //useref의 값을 바꿀때는 return 부분이 실행되지 않음. 리랜더링 안된다고
  // useRef가 dom말고 다른 방법으로 사용되는 부분도 있는데.
  //값이 바뀌기는 하는데 화면에는 영향을 미치고 싶지 않을때 ref를 사용하기도 한다
  const onClickScreen = () => {
    if (state === "waiting") {
      setstate("ready");
      setmessage("초록색이 되면 클릭");
      timeout.current = setTimeout(() => {
        setstate("now");
        setmessage("지금 클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); //2초~3초 랜덤
    } else if (state === "ready") {
      //성급하게 클릭
      clearTimeout(timeout.current);
      setstate("waiting");
      setmessage("성급하셨네, 초록색이 된 후에 클릭");
    } else if (state === "now") {
      //반응속도 체크
      endTime.current = new Date();
      setstate("waiting");
      setmessage("클릭해서 시작하세요.");
      setresult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onReset = () => {
    setresult([]);
    //result를 비워주면 밑에 삼항연산자 에서 null이 되니까
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};
// reduce가 합계를 구하는것임. 빈배열 일때는 못 사용

export default ResponseCheckHooks;
