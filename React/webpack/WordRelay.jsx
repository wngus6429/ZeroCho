const React = require("react");
const { Component } = React;

// class WordRelay extends React.Component {
class WordRelay extends Component {
  state = {
    text: "Hello, webpack",
  };
  render() {
    return <h1>{this.state.text}</h1>;
  }
}

module.exports = WordRelay;
//쪼갠 파일을 밖에서도 사용할수 있게. 노드의 모듈시스템
//이걸 함으로서 const WordRelay = require("./WordRelay") 를 본 파일에 할수 있게 된다.

//파일을 쪼갤때 이 3가지를 꼭 적어줘야한다.
// const React = require("react");
// const { Component } = React;
// module.export = WordRelay();
