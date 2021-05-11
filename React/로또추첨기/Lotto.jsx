import React, { Component } from "react";
import Ball from "./Ball";

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

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), //당첨숫자들
    winBalls: [],
    bonus: null, //보너스공
    redo: false,
  };

  timeouts = []; //this.timeouts

  runTimeouts = () => {
    console.log("런타임아웃");
    const { winNumbers } = this.state;
    //보너스 공 일단 빼줘야 해서 -1 한거임
    //let을 쓰면 클로저 문제 안 생김. 비동기에 변수 같이 쓰면 클로저가 원래 생기는데 let을 쓰면 안 생김
    for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        //리액트에서 뭔가 추가할때는 배열에다가 push 하면 안되고 이렇게
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000); //첫번째 공은 1초뒤에
    } //보너스공
    this.timeouts[7] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[7],
        redo: true, //한번 더 버튼 보이게 할려고
      });
    }, 8000);
    //부모컴포넌트는 자신컴포넌트를 없앨수 있는데 setTimeout 이건 Clear 해줘야한다.
    //아니면 메모리 문제나 이상한 에러들이 많이 생긴다
  };

  componentDidMount() {
    console.log("마운트");
    this.runTimeouts();
  }
  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  //바뀌기 이전의 state가 prevState안에 들어있다
  //바뀐후가 this.state에 들어있다.
  //이부분은 어디서든 setState가 되면 실행은 되는데. 안에 코드보고 움직일지 결정함
  componentDidUpdate(prevProps, prevState) {
    //if (this.state.winBalls.length === 0) {
    if (this.timeouts.length === 0) {
      console.log("디드업데이트"); //이걸 2칸 위에두면 1초마다 계속 보임
      this.runTimeouts();
    }
  }

  onClickRedo = () => {
    console.log("리셋~~~!!");
    this.setState({
      winNumbers: getWinNumbers(), //당첨숫자들
      winBalls: [],
      bonus: null, //보너스공
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨숫자</div>
        <div id="result">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스~!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;
