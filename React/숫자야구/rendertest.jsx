import React, { Component } from "react";

class Test extends Component {
  state = {
    counter: 0,
  };
  //어떤경우에 랜더링 다시 할지 적어줘야함
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) {
      return true;
    }
    return false;
  }

  onClick = () => {
    this.setState({});
  };
  render() {
    console.log("랜더링", this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

export default Test;
