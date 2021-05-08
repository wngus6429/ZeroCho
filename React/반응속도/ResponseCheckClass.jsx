import React, { Component } from "react";

class ResponseCheckClass extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: [],
  };

  timeout; //리랜더링 안 일어나게끔 this.timeout
  startTime; //state로 할경우 리랜더링이 일어나기에 this.startTime으로 만듬
  endTime; //리랜더링 안 일어나게끔 this.endTime

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({ state: "ready", message: "초록색이 되면 클릭" });
      this.timeout = setTimeout(() => {
        this.setState({ state: "now", message: "지금 클릭," });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); //2초~3초 랜덤
    } else if (state === "ready") {
      //성급하게 클릭
      clearTimeout(this.timeout);
      this.setState({ state: "waiting", message: "성급하셨네, 초록색이 된 후에 클릭" });
    } else if (state === "now") {
      //반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요.",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({ result: [] });
    //result를 비워주면 밑에 삼항연산자 에서 null이 되니까
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}
// reduce가 합계를 구하는것임. 빈배열 일때는 못 사용

export default ResponseCheckClass;

// render() {
//   return (
//     <>
//       <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
//         {this.state.message}
//       </div>

//       {this.state.result.length === 0 ? null : <div>평균시간:{this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>}
//       위가 삼항연산자, 여기는 보호연산자 && 사용 {this.state.result.length !== 0 && <div>평균시간:{this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>}
//     </>
//   );
// }
// }
