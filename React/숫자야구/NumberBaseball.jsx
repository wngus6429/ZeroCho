import React, { Component } from "react";

function getNumbers() {} //숫자 4개를 랜덤하게 겹치지 않게 뽑는함수

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "", //input 창의 value
    answer: getNumbers(), //숫자 4개를 뽑아야함
    tries: [], //몇번 시도 했는지 넣지
  };

  onSubmitForm = () => {};

  onChangeInput = () => {};

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {["사과", "바나나", "똥", "like", "like"].map((v) => {
            return <li key={v}>{v}</li>; //5번 실행되겟지
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
