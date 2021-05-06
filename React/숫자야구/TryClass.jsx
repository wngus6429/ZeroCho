import React, { PureComponent } from "react";

class TryClass extends PureComponent {
  render() {
    const { tryInfo } = this.props;
    console.log("리래래랜더링");
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default TryClass;
