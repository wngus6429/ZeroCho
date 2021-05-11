import React, { useState, useRef, useEffect } from "react";
import Ball from "./Ball";

//state 안 쓰는 놈들은 이렇게 분리해주니 좋다 재사용
function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(37)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 7).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const [winNumbers, setwinNumbers] = useState(getWinNumbers());
  const [winballs, setwinballs] = useState([]);
  const [bonus, setbonus] = useState(null);
  const [redo, setredo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log("useEffect");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setwinballs((prevState) => [...prevState.winBalls, winNumbers[i]]);
      }, (i + 1) * 1000); //첫번째 공은 1초뒤에
    } //보너스공
    timeouts.current[7] = setTimeout(() => {
      setbonus(winNumbers[7]);
      setredo(true);
    }, 8000);
    return () => {
      //componentWillUnmount
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [winballs.length === 0]); //여기 빈배열이면 componentDidmount랑 같다
  //배열에 요소가 있으면 componentDidmount랑 componentDidUpdate 둘다 수행

  //바뀌기 이전의 state가 prevState안에 들어있다
  //바뀐후가 this.state에 들어있다.
  //이부분은 어디서든 setState가 되면 실행은 되는데. 안에 코드보고 움직일지 결정함
  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.state.winBalls.length === 0) {
  //       console.log("디드업데이트"); //이걸 2칸 위에두면 1초마다 계속 보임
  //       this.runTimeouts();
  //     }
  //   }

  const onClickRedo = () => {
    console.log("리셋~~~!!");
    setwinNumbers(getWinNumbers());
    setwinballs([]);
    setbonus(null);
    setredo(false);
    timeouts.current = [];
  };

  return (
    <>
      <div>당첨숫자</div>
      <div id="result">
        {winballs.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스~!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
