const React = require("react");
const { Component } = React;

// class WordRelay extends React.Component {
class WordRelay extends Component {
  state = {
    word: "주현님이시다",
    value: "",
    result: "",
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: "딩동댕",
        word: this.state.value,
        value: "",
      });
      this.input.focus();
    } else {
      this.setState({ result: "틀렸당께", value: "" });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  input;
  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
//쪼갠 파일을 밖에서도 사용할수 있게. 노드의 모듈시스템
//이걸 함으로서 const WordRelay = require("./WordRelay") 를 본 파일에 할수 있게 된다.

//파일을 쪼갤때 이 3가지를 꼭 적어줘야한다.
// const React = require("react");
// const { Component } = React;
// module.export = WordRelay();
