import "antd/dist/antd.css";
import React from "react";
import { Component } from "react";
import PropTypes from "prop-types"
//페이지들의 공통된 부분을 처리
//굳이 이름 App 이라고 할 필요 없음.
const App = ({Component}) =>{
return (<Component/>)
}

App.propTypes = {
  Component : PropTypes.elementType.isrequired
}

export default App;
