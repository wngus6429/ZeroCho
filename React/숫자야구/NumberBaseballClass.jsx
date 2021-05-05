import React, { Component } from "react";
import Try from "./Try";

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

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "", //input 창의 value
    answer: getNumbers(), //숫자 4개를 뽑아야함 //ex:[1,3,5,7]
    tries: [], //몇번 시도 했는지 넣지 , push 하면 안됨. 불변성
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      this.setState((prevState) => {
        return {
          result: "홈런",
          tries: [...prevState.tries, { try: this.state.value, result: "홈런!" }],
        };
      }); //옛날꺼 복사해서 새로운거 넣어주는 방법을 해야 리액트가 false인걸 감지하고 리랜더링 한다.
      alert("게임을 다시 시작합니다.");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else {
      //답이 틀렸으면
      const answerArray = this.state.value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({ result: `10번넘게 틀려서 실패! 답은 ${this.state.answer.join(",")}였습니다.` });
        alert("게임을 다시 시작합니다.");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        //10번 틀리기 전에는 기회더주고 몇볼 몇스트라이크인지 알려주고
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: this.state.value, result: `${strike} 스트라이크 ${ball} 볼` }],
            value: "",
          };
        });
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({ value: e.target.value });
  };

  // fruit = [
  //   { fruit: "배", taste: "맛잇네" },
  //   { fruit: "사과", taste: "맛이없다" },
  // ];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {/* v.try랑 v.result가 들어가 있을거임 */}
          {this.state.tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도:`} tryInfo={v} />; //5번 실행되겟지
          })}
        </ul>
        {/* 반복되는걸 배열로 만들어라 */}
      </>
    );
  }
}
export default NumberBaseball; // import NumberBaseball

//맵은 리액트에서 반복문을 쓰는 방법이라고 생각하면 됨
//{/* <input maxLength={4} defaultValue={this.state.value} /> */}
