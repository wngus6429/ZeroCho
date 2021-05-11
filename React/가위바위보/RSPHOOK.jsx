import React, { useState, useRef, useEffect } from "react";

//클래스의 경우 -> constructor -> render -> ref -> componentDidMount
//(setState/props가 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
//부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸
const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

//함수 컴포넌트는 다시 실행될때마다 안에 있는게 다 다시 통째로 실행됨
//그래서 랜더링 될때마다 useEffect가 계속 실행됨
const RSPHOOK = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  //componentDidmount, componentDidupdate랑 비슷한 역할 (1대1 대응은 아님)
  //안에 return은 componentWillUnmount 역할
  //useEffect의 첫번째는 함수, 두번째 인수가 배열임
  //이 두번쨰 [] 부분이 클로저를 해결해준다
  useEffect(() => {
    console.log("다시실행");
    interval.current = setInterval(changeHand, 1000);
    return () => {
      console.log("종료");
      clearInterval(interval.current);
    };
  }, [imgCoord]);
  //바뀌는 state, useEffect를 실행하고 싶은 state
  //두번째 imgCoord가 바뀔때마다 안에꺼 실행해줌
  //그래서 첫번째 실행 그 다음 return 안 실행 계속 반복
  //[] 이 상태면, 뭐가 바뀌든지 신경 안씀, 처음에만 딱한번 실행하는거임, 이게 componentDidmount
  //[] 안에 뭔가 들어있으면 componentDidUpdate가 된다
  //참고로 useEffect는 여러번 써도됨

  const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
      return v[1] === imgCoord;
    })[0];
  };
  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다.");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다.");
      setScore((prevState) => {
        prevState + 1;
      });
    } else {
      setResult("졌습니다!.");
      setScore((prevState) => {
        prevState - 1;
      });
    }
    //사람이 결과 확인 할수 있게
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSPHOOK;
